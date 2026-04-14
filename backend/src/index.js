const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const handleSocketEvents = require('./api/sockets/socketHandler');
const { startSimulation } = require('./services/simulationService');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Initialize real-time components
handleSocketEvents(io);
startSimulation(io);

const PORT = process.env.PORT || 8080;
if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`VenueFlow Backend listening on port ${PORT}`);
  });
}

module.exports = { server, io };
