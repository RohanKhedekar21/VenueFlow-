import React, { useMemo, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { Users } from 'lucide-react';

/**
 * Technical Specification:
 * - SDK: @react-google-maps/api
 * - Service: Google Maps JavaScript API
 * - Purpose: Real-time spatial visualization of crowd density.
 */

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px',
};

// Center: Yankee Stadium (Example Professional Venue)
const center = {
  lat: 40.8296,
  lng: -73.9262
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

/**
 * Map Component
 * Visualizes stadium sectors and their corresponding real-time density.
 */
const Map = ({ crowdData, apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || "", // Injected via Config Bridge
  });

  const getDensityColor = useCallback((density) => {
    if (density < 0.4) return '#22c55e'; // Green
    if (density < 0.7) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }, []);

  const memoizedZones = useMemo(() => [
    { name: 'North Concourse', key: 'concourse-n', position: { lat: 40.8305, lng: -73.9262 } },
    { name: 'South Concourse', key: 'concourse-s', position: { lat: 40.8287, lng: -73.9262 } },
    { name: 'Gate A', key: 'gate-a', position: { lat: 40.8296, lng: -73.9275 } },
    { name: 'Gate B', key: 'gate-b', position: { lat: 40.8296, lng: -73.9249 } },
  ], []);

  if (!isLoaded) return <div className="card">Loading Intelligence Maps...</div>;

  return (
    <div className="card">
      <div className="card-title">
        <Users className="text-primary" size={24} color="var(--primary)" />
        Spatial Crowd Intelligence
      </div>
      <p style={{ marginBottom: '1rem' }}>Official Google Cloud Geolocation tracking active.</p>
      
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={17}
          options={mapOptions}
        >
          {memoizedZones.map((zone) => {
            const density = crowdData[zone.key]?.density || 0;
            return (
              <OverlayView
                key={zone.key}
                position={zone.position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div 
                  className="zone-indicator pulse-animation"
                  style={{ 
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: getDensityColor(density),
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {zone.name}: {(density * 100).toFixed(0)}%
                </div>
              </OverlayView>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(Map);
