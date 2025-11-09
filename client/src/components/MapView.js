// src/components/MapView.js
import React, { useEffect, useRef } from 'react';
import { haversineDistanceKm } from '../utils/geo';
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

function MapView({ atms, selectedATMId, userLocation }) {
  const validAtms = atms.filter(atm => atm && atm.latitude && atm.longitude);
  const popupRefs = useRef({});

  useEffect(() => {
    if (selectedATMId && popupRefs.current[selectedATMId]) {
      popupRefs.current[selectedATMId].openPopup();
    }
  }, [selectedATMId]);

  // Determine map center: prefer first valid ATM, then userLocation, then default coords
  const defaultCenter = [20.5937, 78.9629]; // India centroid as fallback
  const center =
    validAtms.length > 0
      ? [validAtms[0].latitude, validAtms[0].longitude]
      : userLocation
      ? [userLocation.lat, userLocation.lng]
      : defaultCenter;

  // Button that uses the map instance to center on user
  function CenterButton({ userLocation }) {
    const map = useMap();
    const handle = () => {
      if (!userLocation) return;
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1.2 });
    };
    return (
      <button className="fab" onClick={handle} title="Center on me">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" fill="#fff" opacity="0.95"/>
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M17.7 6.3l1.4-1.4M6.3 17.7l-1.4 1.4" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  // Fit bounds to show all ATMs when the atms list changes
  function FitBounds({ atms }) {
    const map = useMap();
    useEffect(() => {
      if (!atms || atms.length === 0) return;
      const latlngs = atms.filter(a => a.latitude && a.longitude).map(a => [a.latitude, a.longitude]);
      if (latlngs.length === 0) return;
      map.fitBounds(latlngs, { padding: [60, 60] });
    }, [atms, map]);
    return null;
  }

  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={validAtms.length > 0 ? 12 : 5}
        className="map-container"
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
          {validAtms.map(atm => {
            const isSelected = selectedATMId === atm.id;
            // choose color by status
            const status = atm.status || 'unknown';
            const statusColor = (s => {
              switch (s) {
                case 'available': return '#10b981';
                case 'low': return '#f97316';
                case 'out_of_cash': return '#ef4444';
                default: return '#7c3aed';
              }
            })(status);

            let markerProps = { key: atm.id, position: [atm.latitude, atm.longitude], ref: el => { popupRefs.current[atm.id] = el; } };
            if (isSelected) {
              const icon = L.divIcon({
                className: 'pulse-marker',
                html: '<div class="ring" style="border-color: rgba(124,58,237,0.5);"></div><div class="dot" style="background: ' + statusColor + '"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
              });
              markerProps.icon = icon;
            } else {
              const html = `<div style="width:14px;height:14px;border-radius:7px;background:${statusColor};border:2px solid white;box-shadow:0 4px 12px rgba(2,6,23,0.12)"></div>`;
              const icon = L.divIcon({ className: 'custom-dot', html, iconSize: [18, 18], iconAnchor: [9, 9] });
              markerProps.icon = icon;
            }

            return (
              <Marker {...markerProps}>
                <Popup>
            <div className="map-popup">
              <strong>{atm.name}</strong><br />
              {atm.bank}<br />
              {atm.address ? `${atm.address}, ` : ''}{atm.city}
              <br />
              Status: {atm.status || 'unknown'}
              {userLocation && atm.latitude && atm.longitude && (
                <>
                  <br />
                  Distance: {haversineDistanceKm(userLocation.lat, userLocation.lng, atm.latitude, atm.longitude).toFixed(2)} km
                </>
              )}
              <br />
              <button
                className="popup-directions-btn"
                onClick={() => {
                  if (userLocation) {
                    const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${atm.latitude},${atm.longitude}`;
                    window.open(url, '_blank');
                  }
                }}
                disabled={!userLocation}
              >
                Get Directions
              </button>
            </div>
          </Popup>
            </Marker>
          );
        })}
        <FitBounds atms={validAtms} />
      <MapController atms={validAtms} selectedATMId={selectedATMId} />
      {/* Render center button inside MapContainer so it has access to map via useMap */}
      <CenterButton userLocation={userLocation} />
    </MapContainer>

      {/* Floating legend and extra overlays */}
      <div className="map-legend" aria-hidden>
        <div style={{fontWeight:700, marginBottom:6}}>Legend</div>
        <div className="legend-row"><div className="legend-dot" style={{background:'#10b981'}}></div><div className="legend-label">Available</div></div>
        <div className="legend-row"><div className="legend-dot" style={{background:'#f97316'}}></div><div className="legend-label">Low cash</div></div>
        <div className="legend-row"><div className="legend-dot" style={{background:'#ef4444'}}></div><div className="legend-label">Out of cash</div></div>
      </div>
    </div>
  );
}

export default MapView;
