const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Mock Venue Data (Static)
const venueLayout = {
  zones: [
    { id: 'gate-a', name: 'Gate A', type: 'gate', capacity: 1000 },
    { id: 'gate-b', name: 'Gate B', type: 'gate', capacity: 1000 },
    { id: 'concourse-n', name: 'North Concourse', type: 'concourse', capacity: 2000 },
    { id: 'concourse-s', name: 'South Concourse', type: 'concourse', capacity: 2000 },
  ],
  amenities: [
    { id: 'food-1', name: 'Burger Stand', type: 'food', location: 'concourse-n' },
    { id: 'food-2', name: 'Hot Dogs & Beer', type: 'food', location: 'concourse-s' },
    { id: 'restroom-n1', name: 'Restroom (North)', type: 'restroom', location: 'concourse-n' },
    { id: 'restroom-s1', name: 'Restroom (South)', type: 'restroom', location: 'concourse-s' },
  ],
  seats: [
    { section: '101', mapX: 20, mapY: 30, closestGate: 'gate-a' },
    { section: '102', mapX: 80, mapY: 30, closestGate: 'gate-b' }
  ]
};

// Initial Dynamic Data
let crowdData = {
  'gate-a': { density: 0.2 },
  'gate-b': { density: 0.8 },
  'concourse-n': { density: 0.5 },
  'concourse-s': { density: 0.3 }
};

let waitTimes = {
  'food-1': { minutes: 15 },
  'food-2': { minutes: 5 },
  'restroom-n1': { minutes: 2 },
  'restroom-s1': { minutes: 0 },
};

// API Route for Static Data
app.get('/api/venue', (req, res) => {
  res.json(venueLayout);
});

// Update data periodically to simulate real-time changes
setInterval(() => {
  // Randomly adjust densities and wait times
  for (let key in crowdData) {
    let change = (Math.random() - 0.5) * 0.1;
    crowdData[key].density = Math.max(0, Math.min(1, crowdData[key].density + change));
  }

  for (let key in waitTimes) {
    let change = Math.floor((Math.random() - 0.5) * 3);
    waitTimes[key].minutes = Math.max(0, waitTimes[key].minutes + change);
  }

  // Push new data to all connected clients
  io.emit('venueUpdate', { crowdData, waitTimes });
}, 5000);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Send current state on connection
  socket.emit('venueUpdate', { crowdData, waitTimes });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
