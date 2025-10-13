// src/components/ATMCard.js
import React from 'react';

function ATMCard({ atm }) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{atm.name}</h3>
      <p>Bank: {atm.bank}</p>
      <p>City: {atm.city}</p>
      <p>Address: {atm.address}</p>
    </div>
  );
}

export default ATMCard;
