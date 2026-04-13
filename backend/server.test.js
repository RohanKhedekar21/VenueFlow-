import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { io as Client } from 'socket.io-client';
import { app, server } from './server';

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

  it('pushes real-time queue states via WebSockets', async () => {
    return new Promise((resolve) => {
      ioClient.on('venueUpdate', (data) => {
        expect(data).toHaveProperty('crowdData');
        expect(data).toHaveProperty('waitTimes');
        expect(data.crowdData).toHaveProperty('gate-a');
        expect(data.waitTimes).toHaveProperty('food-1');
        resolve();
      });
    });
  });
});
