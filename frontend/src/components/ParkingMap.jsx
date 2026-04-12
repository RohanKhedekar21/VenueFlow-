import React from 'react';
import { MapPin } from 'lucide-react';

const ParkingMap = ({ crowdData }) => {
  // Determine which gate is less congested
  const gateA = crowdData?.['gate-a']?.density || 0;
  const gateB = crowdData?.['gate-b']?.density || 0;
  
  const bestGate = gateA <= gateB ? 'Gate A' : 'Gate B';
  const gateQuery = gateA <= gateB ? 'Yankee%20Stadium%20Gate%204' : 'Yankee%20Stadium%20Gate%208'; // Example specific stadium gates

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <div className="card-title">
        <MapPin className="text-primary" size={24} color="var(--primary)" />
        Exterior Transit & Parking
      </div>
      <p style={{ marginBottom: '1rem' }}>
        Live routing via Google Maps to the least congested external entrance. 
        <br/><strong style={{ color: 'var(--status-low)' }}>✓ Currently routing to {bestGate}</strong>
      </p>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '300px' }}>
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          src={`https://maps.google.com/maps?q=${gateQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          title={`Stadium Location Map - Routing to ${bestGate}`}
        ></iframe>
      </div>
    </div>
  );
};

export default ParkingMap;
