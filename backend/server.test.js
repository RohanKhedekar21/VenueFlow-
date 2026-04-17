import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { io as Client } from 'socket.io-client';
import app from './src/app';
import { server } from './src/index';

describe('Backend Server Reliability Tests', () => {
  let ioClient;

  beforeAll(async () => {
    return new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        ioClient = new Client(`http://localhost:${port}`);
        ioClient.on('connect', resolve);
      });
    });
  });

  afterAll(() => {
    if (ioClient) ioClient.close();
    server.close();
  });

  it('serves static layout configuration via REST API on /api/venue', async () => {
    const res = await request(app).get('/api/venue');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('zones');
    expect(res.body).toHaveProperty('amenities');
    expect(res.body.zones.length).toBeGreaterThan(0);
  });

  it('provides security configuration via the Config Bridge on /api/config', async () => {
    const res = await request(app).get('/api/config');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('googleMapsApiKey');
    expect(res.body).toHaveProperty('firebaseApiKey');
    expect(res.body).toHaveProperty('firebaseProjectId');
    expect(res.body).toHaveProperty('firebaseMessagingSenderId');
    expect(res.body).toHaveProperty('firebaseAppId');
  });

  it('pushes real-time queue states via WebSockets', async () => {
    return new Promise((resolve) => {
      ioClient.on('venueUpdate', (envelope) => {
        expect(envelope).toHaveProperty('data');
        expect(envelope).toHaveProperty('signature');
        expect(envelope.data).toHaveProperty('crowdData');
        expect(envelope.data).toHaveProperty('waitTimes');
        expect(envelope.data.crowdData).toHaveProperty('gate-a');
        expect(envelope.data.waitTimes).toHaveProperty('food-1');
        resolve();
      });
    });
  });
});
