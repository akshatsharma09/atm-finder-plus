import React, { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';
import ATMCard from './components/ATMCard';
import MapView from './components/MapView';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [atmList, setAtmList] = useState([]);
  const [selectedATMId, setSelectedATMId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(null)
      );
    }
  }, []);

  const handleSearch = async () => {
    setFetchError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/atms?query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const data = await response.json();
      setAtmList(data);
    } catch (err) {
      console.error('Fetch error', err);
      setFetchError(err.message || 'Failed to fetch');
      setAtmList([]);
    }
  };

  const selectATM = (id) => {
    setSelectedATMId(id);
    // scroll card into view
    setTimeout(() => {
      const el = document.getElementById(`atm-${id}`);
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="title">
          <div className="logo" aria-hidden>
            {/* simple SVG mark */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L20 7v6c0 5-3 8-8 8s-8-3-8-8V7l8-4z" fill="white" opacity="0.12"/>
              <path d="M12 6l5 2.5V12c0 3-2 5-5 5s-5-2-5-5V8.5L12 6z" fill="white"/>
            </svg>
          </div>
          ATM Finder Plus
        </div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by city or bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <button className="search-btn" onClick={handleSearch} aria-label="Search">
            <FiSearch style={{ verticalAlign: 'middle' }} />
          </button>
        </div>
      </div>

      <div className="layout">
        <div className="sidebar">
            {fetchError && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                Could not fetch ATM data: {fetchError}. Make sure the backend is running on port 5000.
              </div>
            )}

            {atmList.length === 0 ? (
              <div className="no-results">
                <h3>No results</h3>
                <p>Try searching a city or bank. The map on the right will show available ATM locations.</p>
              </div>
            ) : (
              atmList.map((atm) => (
                <div key={atm.id} id={`atm-${atm.id}`} onClick={() => selectATM(atm.id)} onKeyDown={(e) => { if (e.key === 'Enter') selectATM(atm.id); }} tabIndex={0}>
                  <ATMCard atm={atm} userLocation={userLocation} selected={selectedATMId === atm.id} />
                </div>
              ))
            )}
        </div>
        <div className="map-panel">
          <MapView atms={atmList} selectedATMId={selectedATMId} userLocation={userLocation} />
        </div>
      </div>
    </div>
  );
}

export default App;
