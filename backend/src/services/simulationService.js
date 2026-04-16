const { getCrowdData, getWaitTimes, updateCrowdData, updateWaitTimes } = require('./dataService');

const startSimulation = (io) => {
  setInterval(async () => {
    const crowdData = getCrowdData();
    const waitTimes = getWaitTimes();

    // Randomly adjust densities and wait times
    const newCrowdData = {};
    for (let key in crowdData) {
      let change = (Math.random() - 0.5) * 0.1;
      newCrowdData[key] = {
        density: Math.max(0, Math.min(1, crowdData[key].density + change))
      };
    }
    updateCrowdData(newCrowdData);

    const newWaitTimes = {};
    for (let key in waitTimes) {
      let change = Math.floor((Math.random() - 0.5) * 3);
      newWaitTimes[key] = {
        minutes: Math.max(0, waitTimes[key].minutes + change)
      };
    }
    updateWaitTimes(newWaitTimes);

    const { signPayload } = require('./securityService');
    const payload = { crowdData: getCrowdData(), waitTimes: getWaitTimes() };

    // Push new data to all connected clients with integrity signature
    io.emit('venueUpdate', { 
      data: payload,
      signature: signPayload(payload)
    });
    
  }, 5000);
};

module.exports = {
  startSimulation
};
