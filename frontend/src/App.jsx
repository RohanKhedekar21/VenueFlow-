import React, { useEffect, useState } from 'react';
import { useSocket } from './hooks/useSocket';
import Map from './components/Map';
import AmenitiesList from './components/AmenitiesList';
import ParkingMap from './components/ParkingMap';
import { Activity, Eye } from 'lucide-react';

function App() {
  const { data, isConnected } = useSocket();
  const [venueLayout, setVenueLayout] = useState(null);
  const [isAccessible, setIsAccessible] = useState(false);

  useEffect(() => {
    // Accessibility toggle logic
    if (isAccessible) {
      document.body.classList.add('accessible-mode');
    } else {
      document.body.classList.remove('accessible-mode');
    }
  }, [isAccessible]);

  useEffect(() => {
    // Fetch static layout first
    fetch('http://localhost:3001/api/venue')
      .then(res => res.json())
      .then(layout => setVenueLayout(layout))
      .catch(err => console.error("Error fetching layout:", err));
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <Activity color="var(--primary)" size={28} aria-hidden="true" />
          <div className="logo" role="heading" aria-level="1">VenueFlow</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="accessibility-btn" 
            onClick={() => setIsAccessible(!isAccessible)}
            aria-label="Toggle High Contrast and Large Text Mode"
            title="Toggle Accessibility Mode"
          >
            <Eye size={20} />
          </button>
          
          {isConnected ? (
            <span className="badge low" aria-live="polite" style={{ animation: 'pulse 2s infinite' }}>Live Data Active</span>
          ) : (
            <span className="badge high" aria-live="assertive">Connecting...</span>
          )}
        </div>
      </header>

      <main className="dashboard-grid">
        <div className="main-content">
          <Map crowdData={data.crowdData} />
          <ParkingMap crowdData={data.crowdData} />
        </div>
        
        <aside className="sidebar">
          <AmenitiesList waitTimes={data.waitTimes} venueLayout={venueLayout} />
        </aside>
      </main>
    </div>
  );
}

export default App;
