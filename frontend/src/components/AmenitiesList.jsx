import React from 'react';
import { Clock, Coffee, Droplets } from 'lucide-react';

const AmenitiesList = ({ waitTimes, venueLayout }) => {
  if (!venueLayout) return <div>Loading layout...</div>;

  const getStatusClass = (minutes) => {
    if (minutes < 5) return 'low';
    if (minutes < 15) return 'med';
    return 'high';
  };

  return (
    <div className="card">
      <div className="card-title">
        <Clock className="text-primary" size={24} color="var(--primary)" />
        Live Wait Times
      </div>
      <p style={{ marginBottom: '1rem' }}>Skip the wait. Quickest access to amenities.</p>

      <div className="amenity-list">
        {venueLayout.amenities.map(amenity => {
          const waitMins = waitTimes[amenity.id]?.minutes || 0;
          return (
            <div key={amenity.id} className="amenity-item">
              <div className="amenity-info">
                <h4>
                  {amenity.type === 'food' ? (
                    <Coffee size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  ) : (
                    <Droplets size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  )}
                  {amenity.name}
                </h4>
                <p>Location: {amenity.location === 'concourse-n' ? 'North Concourse' : 'South Concourse'}</p>
              </div>
              <div>
                <span className={`badge ${getStatusClass(waitMins)}`}>
                  <Clock size={14} /> {waitMins} min
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesList;
