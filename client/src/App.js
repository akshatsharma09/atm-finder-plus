// src/App.js
import React, { useState } from 'react';
import ATMList from './components/ATMList';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import 'leaflet/dist/leaflet.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [atms, setAtms] = useState([]);
  const [selectedATMId, setSelectedATMId] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>ATM Locator</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ATMList
        searchTerm={searchTerm}
        atms={atms}
        setAtms={setAtms}
        setSelectedATMId={setSelectedATMId}
      />

      <MapView
        atms={atms.filter(atm =>
          atm.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          atm.bank.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        selectedATMId={selectedATMId}
      />
    </div>
  );
}

export default App;
