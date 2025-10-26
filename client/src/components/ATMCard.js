// src/components/ATMCard.js
import React from 'react';
import { FiMapPin, FiCreditCard } from 'react-icons/fi';
import { haversineDistanceKm } from '../utils/geo';

function ATMCard({ atm, userLocation, selected }) {
  const status = atm.status || 'unknown';
  let distanceText = '—';
  if (userLocation && atm.latitude && atm.longitude) {
    const km = haversineDistanceKm(userLocation.lat, userLocation.lng, atm.latitude, atm.longitude);
    distanceText = `${km.toFixed(2)} km`;
  }

  const statusClass = `status-chip status-${status.replace(/\s+/g, '_')}`;

  return (
    <div className={`atm-card ${selected ? 'selected' : ''}`} tabIndex={0} role="button" aria-pressed={selected}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#2563eb)', display: 'grid', placeItems: 'center', color: 'white' }}>
            <FiCreditCard />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>{atm.name}</h3>
            <div style={{ color: '#64748b', fontSize: 13 }}>{atm.bank} • {atm.city}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={statusClass} title={`Status: ${status}`}>{status.replace(/_/g, ' ')}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }} className="distance">{distanceText}</div>
        </div>
      </div>
      {atm.address && <div style={{ marginTop: 10, color: '#475569', fontSize: 13 }}><FiMapPin style={{ verticalAlign: 'middle', marginRight: 6 }} />{atm.address}</div>}
    </div>
  );
}

export default ATMCard;
