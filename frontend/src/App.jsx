import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useSocket } from './hooks/useSocket';
import { useConfig } from './hooks/useConfig'; // Phase 2: Runtime Config Bridge
import { initFirebase } from './firebase'; // Dynamic initialization
import Map from './components/Map';
import AmenitiesList from './components/AmenitiesList';
import ParkingMap from './components/ParkingMap';
import { Activity, Eye, Loader2 } from 'lucide-react';

/**
 * Technical Specification:
 * - Orchestration: Config Bridge -> Socket Handlers -> Dashboard UI
 * - Optimization: React.memo & useMemo to prevent redundant dashboard renders.
 */
function App() {
  const { config, isLoading: isConfigLoading } = useConfig();
  const { data, isConnected, isSecure } = useSocket();
  const [venueLayout, setVenueLayout] = useState(null);
  const [isAccessible, setIsAccessible] = useState(false);

  // Toggle accessibility mode via DOM class to avoid deep tree re-renders
  useEffect(() => {
    document.body.classList.toggle('accessible-mode', isAccessible);
  }, [isAccessible]);

  // Load layout once on mount
  useEffect(() => {
    let isMounted = true;
    axios.get('/api/venue')
      .then(res => {
        if (isMounted) setVenueLayout(res.data);
      })
      .catch(err => console.error("Error loading layout:", err));
    
    return () => { isMounted = false; };
  }, []);

  const handleToggleAccessibility = useCallback(() => {
    setIsAccessible(prev => !prev);
  }, []);

  // Memoize data objects for children
  const crowdData = useMemo(() => data.crowdData, [data.crowdData]);
  const waitTimes = useMemo(() => data.waitTimes, [data.waitTimes]);

  // Initialize Firebase once config is available
  useEffect(() => {
    if (config) {
      initFirebase(config);
    }
  }, [config]);

  // Loading state with premium design
  if (isConfigLoading) {
    return (
      <div className="loading-screen">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p>Initializing Secure Config Bridge...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!isSecure && (
        <div className="security-alert-bar" role="alert" aria-live="assertive">
          🚨 CRITICAL: DATA TAMPERING DETECTED! INCOMING INFORMATION IS UNVERIFIED.
        </div>
      )}
      
      <header className="header">
        <div className="logo-container">
          <Activity color="var(--primary)" size={28} aria-hidden="true" />
          <div className="logo" role="heading" aria-level="1">VenueFlow</div>
          <span className="version-tag">Runtime Bridge v2.0</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={`security-badge ${isSecure ? 'safe' : 'compromised'}`}>
            {isSecure ? '🛡️ Integrity Verified' : '⚠️ Unverified'}
          </div>
          <button 
            className="accessibility-btn" 
            onClick={handleToggleAccessibility}
            aria-label="Toggle High Contrast and Large Text Mode"
            title="Toggle Accessibility Mode"
          >
            <Eye size={20} />
          </button>
          
          <div aria-live="polite">
            {isConnected ? (
              <span className="badge low" style={{ animation: 'pulse 2s infinite' }}>Live Data Active</span>
            ) : (
              <span className="badge high">Connecting...</span>
            )}
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <div className="main-content">
          <Map crowdData={crowdData} apiKey={config?.googleMapsApiKey} />
          <ParkingMap crowdData={crowdData} apiKey={config?.googleMapsApiKey} />
        </div>
        
        <aside className="sidebar">
          <AmenitiesList waitTimes={waitTimes} venueLayout={venueLayout} />
        </aside>
      </main>
    </div>
  );
}

export default App;
