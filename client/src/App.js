import React, { useState, useEffect } from "react";
import { FiSearch, FiUser, FiHeart } from 'react-icons/fi';
import ATMCard from './components/ATMCard';
import MapView from './components/MapView';
import AuthModal from './components/AuthModal';
import ThemeToggle from './components/ThemeToggle';
import FilterPanel from './components/FilterPanel';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [atmList, setAtmList] = useState([]);
  const [selectedATMId, setSelectedATMId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', bank: 'all', maxDistance: '' });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(null)
      );
    }
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Error parsing favorites:', error);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage
  useEffect(() => {
    if (user && favorites.length >= 0) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const handleSearch = async () => {
    setFetchError(null);
    try {
      const params = new URLSearchParams({
        query: searchTerm,
        status: filters.status,
        bank: filters.bank,
        maxDistance: filters.maxDistance,
        ...(userLocation && {
          userLat: userLocation.lat.toString(),
          userLng: userLocation.lng.toString(),
        }),
      });

      const response = await fetch(`http://localhost:5000/api/atms?${params}`);
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

  const toggleFavorite = (atmId) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setFavorites(prev =>
      prev.includes(atmId)
        ? prev.filter(id => id !== atmId)
        : [...prev, atmId]
    );
  };

  const getDisplayedATMs = () => {
    if (showFavorites) {
      return atmList.filter(atm => favorites.includes(atm.id));
    }
    return atmList;
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

        <div className="header-controls">
          <ThemeToggle />

          {user ? (
            <div className="user-menu">
              <button
                className={`favorites-btn ${showFavorites ? 'active' : ''}`}
                onClick={() => setShowFavorites(!showFavorites)}
                title="Toggle favorites"
              >
                <FiHeart />
                Favorites ({favorites.length})
              </button>
              <span className="user-greeting">Hi, {user.name}</span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="auth-btn" onClick={() => setAuthModalOpen(true)}>
              <FiUser />
              Sign In
            </button>
          )}

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
      </div>

      <div className="filters-row">
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          isOpen={filterPanelOpen}
          onToggle={() => setFilterPanelOpen(!filterPanelOpen)}
        />
      </div>

      <div className="layout">
        <div className="sidebar">
            {fetchError && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                Could not fetch ATM data: {fetchError}. Make sure the backend is running on port 5000.
              </div>
            )}

            {getDisplayedATMs().length === 0 ? (
              <div className="no-results">
                <h3>{showFavorites ? 'No favorites yet' : 'No results'}</h3>
                <p>
                  {showFavorites
                    ? 'Add ATMs to your favorites by clicking the heart icon.'
                    : 'Try searching a city or bank. The map on the right will show available ATM locations.'
                  }
                </p>
              </div>
            ) : (
              getDisplayedATMs().map((atm) => (
                <div key={atm.id} id={`atm-${atm.id}`} onClick={() => selectATM(atm.id)} onKeyDown={(e) => { if (e.key === 'Enter') selectATM(atm.id); }} tabIndex={0}>
                  <ATMCard
                    atm={atm}
                    userLocation={userLocation}
                    selected={selectedATMId === atm.id}
                    isFavorite={favorites.includes(atm.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))
            )}
        </div>
        <div className="map-panel">
          <MapView atms={getDisplayedATMs()} selectedATMId={selectedATMId} userLocation={userLocation} />
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}

export default App;
