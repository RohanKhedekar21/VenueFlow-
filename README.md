# 🏟️ VenueFlow
**Real-Time Stadium Crowd Management & Safety Intelligence**

🔗 **Live Deployment**: [venueflow-364029198802.us-central1.run.app](https://venueflow-364029198802.us-central1.run.app)

VenueFlow is a high-performance, resilient platform designed for stadium authorities to monitor crowd density, optimize facility wait times, and ensure fan safety through real-time data visualization and cryptographic integrity.

---

## ⚡ Features
- **📊 Google Maps Integration**: Real-time crowd density tracking on native Google Maps components via `@react-google-maps/api`.
- **🚗 Smart Routing**: AI-optimized directions to the least congested stadium entrance using Google Cloud Directions API.
- **🌉 Dynamic Config Bridge**: Zero-downtime, secure runtime injection of API keys. Secrets are never baked into Docker images.
- **🛡️ Data Integrity**: Every packet is signed with HMAC-SHA256 to prevent misinformation and tampering.
- **♿ Accessibility First**: Built-in high-contrast and fully ARIA-compliant UI for an inclusive fan experience.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Socket.io, Lucide-React.
- **Cloud Services**: Google Cloud Run, Google Maps JavaScript API, Firebase Analytics.
- **Backend**: Node.js & Express 5 (Hardened with Helmet/Rate-Limit/CSP).
- **Communication**: Throttled bi-directional WebSockets.
- **Security**: SubtleCrypto-based digital signatures & strict CORS.

## 🚀 Quick Start

### 1. Clone & Environment
```bash
git clone https://github.com/RohanKhedekar21/VenueFlow-.git
cd VenueFlow-
```

### 2. Install Dependencies
```bash
# Install backend
cd backend && npm install
# Install frontend
cd ../frontend && npm install
```

### 3. Start Development
```bash
# Terminal 1 (Backend)
cd backend && npm run dev
# Terminal 2 (Frontend)
cd frontend && npm run dev
```
Visit: `http://localhost:5173`

## 📖 Documentation
Detailed technical guides are available in the [docs/](./docs/) directory:
- [🏗️ System Architecture](./docs/ARCHITECTURE.md)
- [🔒 Security Protocols](./docs/SECURITY.md)
- [📡 API & Socket Reference](./docs/API.md)
- [⚙️ Operations & Deployment](./docs/OPERATIONS.md)

---
*Prioritizing Stadium Safety & Fan Intelligence since 2026.*
