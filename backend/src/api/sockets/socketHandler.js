const { getCrowdData, getWaitTimes } = require('../../services/dataService');
const { signPayload } = require('../../services/securityService');

const handleSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('🛡️ Secure connection established:', socket.id);
    
    // Initial sync
    const payload = { 
      crowdData: getCrowdData(), 
      waitTimes: getWaitTimes() 
    };

    socket.emit('venueUpdate', { 
      data: payload,
      signature: signPayload(payload)
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = handleSocketEvents;
