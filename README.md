# 🏟️ VenueFlow
**Real-Time Stadium Crowd Management & Safety Intelligence**

🔗 **Live Deployment**: [venueflow-364029198802.us-central1.run.app](https://venueflow-364029198802.us-central1.run.app)

VenueFlow is a high-performance, resilient platform designed for stadium authorities to monitor crowd density, optimize facility wait times, and ensure fan safety through real-time data visualization and cryptographic integrity.

---

## ⚡ Features
- **📊 Live Heatmaps**: Real-time crowd density tracking for all stadium gates and concourses.
- **🛡️ Data Integrity**: Every packet is signed with HMAC-SHA256 to prevent misinformation and tampering.
- **♿ Accessibility First**: Built-in high-contrast and large-text modes for inclusive fan experience.
- **🚦 Smart Facilities**: Dynamic wait-time tracking for restrooms and food concessions.
- **🚗 Parking Intelligence**: Real-time stall availability and entry-point management.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Socket.io, Lucide-React.
- **Backend**: Node.js & Express 5 (Hardenend with Helmet/Rate-Limit).
- **Communication**: Real-time bi-directional WebSockets.
- **Security**: SubtleCrypto-based digital signatures.

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
*Built for the Google DeepMind Hackathon 2026. Prioritizing Stadium Safety & Fan Intelligence.*
