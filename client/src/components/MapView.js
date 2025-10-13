// src/components/MapView.js
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Component to fly to selected ATM
function MapController({ atms, selectedATMId }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedATMId) return;
    const atm = atms.find(a => a.id === selectedATMId);
    if (atm && atm.latitude && atm.longitude) {
      map.flyTo([atm.latitude, atm.longitude], 15, { duration: 1.5 });
    }
  }, [selectedATMId, atms, map]);
  return null;
}

function MapView({ atms, selectedATMId }) {
  const validAtms = atms.filter(atm => atm.latitude && atm.longitude);
  const popupRefs = useRef({});

  if (validAtms.length === 0) {
    return <p style={{ marginTop: '20px' }}>No ATM locations available to display on the map.</p>;
  }

  const center = [validAtms[0].latitude, validAtms[0].longitude];

  useEffect(() => {
    if (selectedATMId && popupRefs.current[selectedATMId]) {
      popupRefs.current[selectedATMId].openPopup();
    }
  }, [selectedATMId]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '500px', width: '100%', marginTop: '20px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {validAtms.map(atm => (
        <Marker
          key={atm.id}
          position={[atm.latitude, atm.longitude]}
          ref={el => { popupRefs.current[atm.id] = el; }}
        >
          <Popup>
            <strong>{atm.name}</strong><br />
            {atm.bank}<br />
            {atm.address}, {atm.city}
          </Popup>
        </Marker>
      ))}
      <MapController atms={validAtms} selectedATMId={selectedATMId} />
    </MapContainer>
  );
}

export default MapView;
