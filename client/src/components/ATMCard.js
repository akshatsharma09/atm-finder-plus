// src/components/ATMCard.js
import React, { useState } from 'react';
import { FiMapPin, FiCreditCard, FiHeart, FiStar, FiNavigation } from 'react-icons/fi';
import { haversineDistanceKm } from '../utils/geo';
import ReviewModal from './ReviewModal';

function ATMCard({ atm, userLocation, selected, isFavorite, onToggleFavorite }) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const status = atm.status || 'unknown';
  let distanceText = '—';
  if (userLocation && atm.latitude && atm.longitude) {
    const km = haversineDistanceKm(userLocation.lat, userLocation.lng, atm.latitude, atm.longitude);
    distanceText = `${km.toFixed(2)} km`;
  }

  const statusClass = `status-chip status-${status.replace(/\s+/g, '_')}`;

  const handleDirections = () => {
    if (userLocation && atm.latitude && atm.longitude) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${atm.latitude},${atm.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <>
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

        <div className="card-actions">
          <button
            className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(atm.id); }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart />
          </button>

          <button
            className="action-btn review-btn"
            onClick={(e) => { e.stopPropagation(); setReviewModalOpen(true); }}
            title="View reviews"
          >
            <FiStar />
          </button>

          <button
            className="action-btn directions-btn"
            onClick={(e) => { e.stopPropagation(); handleDirections(); }}
            title="Get directions"
            disabled={!userLocation}
          >
            <FiNavigation />
          </button>
        </div>
      </div>

      <ReviewModal
        atm={atm}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />
    </>
  );
}

export default ATMCard;
