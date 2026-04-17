import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

/**
 * Technical Specification:
 * - SDK: @react-google-maps/api
 * - Service: Google Maps Directions Service
 * - Purpose: Dynamic fan routing to the least congested stadium entrance.
 */

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '12px',
};

// Start point: Transit Hub near stadium
const origin = { lat: 40.8275, lng: -73.9324 }; 

const ParkingMap = ({ crowdData, apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || "", 
  });

  const [response, setResponse] = useState(null);

  // Determine least congested gate
  const gateA = crowdData?.['gate-a']?.density || 0;
  const gateB = crowdData?.['gate-b']?.density || 0;
  const bestGate = gateA <= gateB ? 'Gate A' : 'Gate B';
  const destination = gateA <= gateB 
    ? { lat: 40.8296, lng: -73.9275 } // Gate A coordinates
    : { lat: 40.8296, lng: -73.9249 }; // Gate B coordinates

  const directionsCallback = (res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    }
  };

  if (!isLoaded) return <div className="card">Loading Routing Engine...</div>;

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <div className="card-title">
        <MapPin className="text-primary" size={24} color="var(--primary)" />
        Dynamic Transit Routing
      </div>
      <p style={{ marginBottom: '1rem' }}>
        AI-optimized directions to <strong>{bestGate}</strong> via Google Cloud Directions API.
      </p>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={15}
          center={origin}
        >
          {response === null && (
            <DirectionsService
              options={{ destination, origin, travelMode: 'WALKING' }}
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer
              options={{ directions: response }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(ParkingMap);
