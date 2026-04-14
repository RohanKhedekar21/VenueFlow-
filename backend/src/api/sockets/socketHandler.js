const { getCrowdData, getWaitTimes } = require('../../services/dataService');

const handleSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Send current state on connection
    socket.emit('venueUpdate', { 
      crowdData: getCrowdData(), 
      waitTimes: getWaitTimes() 
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = handleSocketEvents;
