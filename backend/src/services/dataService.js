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

const getCrowdData = () => crowdData;
const getWaitTimes = () => waitTimes;

const updateCrowdData = (newData) => {
  crowdData = { ...crowdData, ...newData };
};

const updateWaitTimes = (newData) => {
  waitTimes = { ...waitTimes, ...newData };
};

module.exports = {
  getCrowdData,
  getWaitTimes,
  updateCrowdData,
  updateWaitTimes
};
