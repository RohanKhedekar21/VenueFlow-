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

module.exports = venueLayout;
