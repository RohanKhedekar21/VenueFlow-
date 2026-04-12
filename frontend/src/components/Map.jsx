import React from 'react';
import { Users } from 'lucide-react';

const Map = ({ crowdData }) => {
  // Helper to determine color based on density (0 to 1)
  const getDensityColor = (density) => {
    if (density < 0.4) return 'var(--status-low)';
    if (density < 0.7) return 'var(--status-med)';
    return 'var(--status-high)';
  };

  const getDensityText = (density) => {
    if (density < 0.4) return 'Low';
    if (density < 0.7) return 'Medium';
    return 'High';
  };

  return (
    <div className="card">
      <div className="card-title">
        <Users className="text-primary" size={24} color="var(--primary)" />
        Live Crowd Map
      </div>
      <p style={{ marginBottom: '1rem' }}>Real-time congestion levels across the venue.</p>
      
      <div className="map-container">
        <div className="stadium-graphic">
          <div className="pitch"></div>
          
          {/* North Concourse */}
          <div 
            className="zone-indicator pulse-animation"
            style={{ 
              top: '5%', left: '30%', width: '40%', textAlign: 'center',
              backgroundColor: getDensityColor(crowdData['concourse-n']?.density || 0),
              color: 'white'
            }}
          >
            North Concourse: {getDensityText(crowdData['concourse-n']?.density || 0)}
          </div>

          {/* South Concourse */}
          <div 
            className="zone-indicator pulse-animation"
            style={{ 
              bottom: '5%', left: '30%', width: '40%', textAlign: 'center',
              backgroundColor: getDensityColor(crowdData['concourse-s']?.density || 0),
              color: 'white'
            }}
          >
            South Concourse: {getDensityText(crowdData['concourse-s']?.density || 0)}
          </div>

          {/* Gate A */}
          <div 
            className="zone-indicator pulse-animation"
            style={{ 
              top: '40%', left: '-5%',
              backgroundColor: getDensityColor(crowdData['gate-a']?.density || 0),
              color: 'white'
            }}
          >
            Gate A: {getDensityText(crowdData['gate-a']?.density || 0)}
          </div>

          {/* Gate B */}
          <div 
            className="zone-indicator pulse-animation"
            style={{ 
              top: '40%', right: '-5%',
              backgroundColor: getDensityColor(crowdData['gate-b']?.density || 0),
              color: 'white'
            }}
          >
            Gate B: {getDensityText(crowdData['gate-b']?.density || 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
