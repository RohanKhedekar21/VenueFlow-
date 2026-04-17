import React from 'react';
import { Clock, Coffee, Droplets } from 'lucide-react';

/**
 * Technical Specification:
 * - Purpose: Displays real-time wait times for restrooms and concessions.
 * - Logic: Dynamic status badges based on minute thresholds.
 */
const AmenitiesList = ({ waitTimes, venueLayout }) => {
  if (!venueLayout) return <div>Loading layout...</div>;

  /**
   * getStatusClass
   * @param {number} minutes 
   * @returns {string} CSS class for status badge
   */
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
                    <Coffee size={16} style={{ display: 'inline', marginRight: '6px' }} aria-hidden="true" />
                  ) : (
                    <Droplets size={16} style={{ display: 'inline', marginRight: '6px' }} aria-hidden="true" />
                  )}
                  {amenity.name}
                </h4>
                <p>Location: {amenity.location === 'concourse-n' ? 'North Concourse' : 'South Concourse'}</p>
              </div>
              <div>
                <span className={`badge ${getStatusClass(waitMins)}`} aria-label={`${waitMins} minute wait`}>
                  <Clock size={14} aria-hidden="true" /> {waitMins} min
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(AmenitiesList);
