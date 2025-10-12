import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

function statusColor(status) {
  switch (status) {
    case 'available': return 'green';
    case 'low': return 'orange';
    case 'out_of_cash': return 'red';
    case 'maintenance': return 'gray';
    default: return 'blue';
  }
}

export default function App() {
  const [atms, setAtms] = useState([]);
  const [pos, setPos] = useState([28.6139, 77.2090]); // default center (lat, lng)

  useEffect(() => {
    // try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        setPos([p.coords.latitude, p.coords.longitude]);
        fetchAtms(p.coords.latitude, p.coords.longitude);
      }, () => {
        fetchAtms(pos[0], pos[1]);
      });
    } else {
      fetchAtms(pos[0], pos[1]);
    }
  }, []);

  function fetchAtms(lat, lng) {
    const url = `http://localhost:5000/api/atms?lat=${lat}&lng=${lng}&radiusKm=10`;
    fetch(url)
      .then(r => r.json())
      .then(data => setAtms(data))
      .catch(err => console.error(err));
  }

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={pos} zoom={13} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pos}>
          <Popup>Your location</Popup>
        </Marker>

        {atms.map(atm => {
          const [lng, lat] = atm.location.coordinates;
          return (
            <CircleMarker
              key={atm._id}
              center={[lat, lng]}
              radius={10}
              pathOptions={{ color: statusColor(atm.status) }}
            >
              <Popup>
                <div>
                  <strong>{atm.name}</strong><br/>
                  {atm.bank}<br/>
                  Status: {atm.status}<br/>
                  Last Updated: {new Date(atm.lastUpdated).toLocaleString()}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
