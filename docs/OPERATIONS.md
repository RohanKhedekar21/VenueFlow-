# ⚙️ VenueFlow Operations & Maintenance Guide

This document is intended for the DevOps and Maintenance teams responsible for the reliability and deployment of the VenueFlow platform.

## 🚀 Deployment (Google Cloud Run)

VenueFlow is fully containerized and deploys automatically via GitHub Actions.

🔗 **Service URL**: [https://venueflow-364029198802.us-central1.run.app](https://venueflow-364029198802.us-central1.run.app)

### Continuous Deployment Pattern:
1.  **Trigger**: Every push to the `main` branch.
2.  **Steps**: `Test` (Front/Back) -> `Build` (Docker) -> `Push` (Artifact Registry) -> `Deploy` (Cloud Run).

### Manual Setup (if needed):
```bash
# Build the image
docker build -t gcr.io/[PROJECT_ID]/venueflow:latest .
# Push to registry
docker push gcr.io/[PROJECT_ID]/venueflow:latest
# Deploy
gcloud run deploy venueflow --image gcr.io/[PROJECT_ID]/venueflow:latest --platform managed
```

---

## 🔑 Environment Variables

The application requires the following environment variables to be set in the Cloud Run service configuration:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | The port the server listens on | `8080` |
| `SYSTEM_SECRET` | Secret key for HMAC signatures | *Required* |
| `NODE_ENV` | Environment mode | `production` |

---

## 🌉 Runtime Configuration (Config Bridge)

VenueFlow v2.0 uses a **Config Bridge** to manage application secrets dynamically via the `/api/config` endpoint. This allows you to update API keys without rebuilding the container.

1.  **Supported Keys**:
    *   `VITE_GOOGLE_MAPS_API_KEY` or `GOOGLE_MAPS_API_KEY`: Official Maps SDK key.
    *   `VITE_FIREBASE_API_KEY` or `FIREBASE_API_KEY`: Firebase initialization key.
    *   `FIREBASE_PROJECT_ID`: The GCP project ID for Firebase services.

2.  **Management**:
    - Manage these keys in the **Google Cloud Run Console** under the **Variables & Secrets** tab.
    - After updating keys, you only need to **Restart** the Cloud Run service; a new Docker build is **NOT** required.

---

## 🧪 Maintenance Tasks

### Simulation Tuning
The crowd simulation logic is located in `backend/src/services/simulationService.js`.
- **Frequency**: Currently set to 5000ms (5 seconds).
- **Jitter**: Density shifts are capped at +/- 10% per cycle.

### Monitoring Logs
View live application logs using the gcloud CLI:
```bash
gcloud beta run services logs tail venueflow --project [PROJECT_ID]
```

---

## 📈 Scaling Guidance

VenueFlow is structured to be stateless, with the following considerations:
- **WebSockets**: Cloud Run handles WebSocket connections, but verify that "Session Affinity" is enabled in the Cloud Run settings if you scale to multiple instances.
- **Memory**: The Node.js process is lightweight. `512MB` is usually sufficient for up to 1,000 concurrent WebSocket connections.
- **CPU**: `1 vCPU` is sufficient for the simulation load.

---

## 🛠️ Internal Troubleshooting
1.  **"Unverified" Badge on Frontend**: Ensure the `SYSTEM_SECRET` in the backend matches the constant in `frontend/src/hooks/useSocket.js`.
2.  **No Updates**: Check if the `simulationService` is started in `backend/src/index.js`.
3.  **CORS Errors**: Check `backend/src/app.js` to ensure the correct frontend domain is allowed.
