# 📡 VenueFlow API & Socket Reference

This document provides a technical specification for the communication interfaces between the VenueFlow UI and Backend.

## 🌐 REST API

All API requests should be prefixed with `/api`.

### 1. Get Venue Layout
Returns the static structural design of the stadium, including gates, concourses, and amenities locations.

- **Endpoint**: `GET /venue`
- **Response Type**: `JSON`
- **Authentication**: None Required.
- **Sample Response**:
```json
{
  "name": "Stadium Arena",
  "gates": [
    { "id": "gate-a", "name": "Gate A", "location": "North" }
  ],
  "amenities": [
    { "id": "food-1", "name": "Burger Barn", "type": "food" }
  ]
}
```

---

## ⚡ WebSocket (Socket.io)

Real-time synchronization happens over Socket.io.

### Event: `venueUpdate`
Broadcasted every 5 seconds from the server to all connected clients.

- **Payload Format**: `Enveloped HMAC Packet`
- **Auth**: Integrity signature required.

#### Packet Structure:
```json
{
  "data": {
    "crowdData": {
      "gate-a": { "density": 0.45 },
      "concourse-n": { "density": 0.22 }
    },
    "waitTimes": {
      "food-1": { "minutes": 12 },
      "restroom-n1": { "minutes": 2 }
    }
  },
  "signature": "a5f8c3d9..."
}
```

---

## 🛡️ Error Handling

| Code | Meaning | Outcome |
| :--- | :--- | :--- |
| **404** | Endpoint not found | Check `/api` prefix |
| **429** | Rate Limit Exceeded | IP blocked for 15 mins |
| **Invalid Sig** | Signature Mismatch | Dashboard Alert Triggered |

---

## 🧪 Client Side Usage (Axios)
```javascript
import axios from 'axios';

const fetchLayout = async () => {
  const response = await axios.get('/api/venue');
  return response.data;
};
```
