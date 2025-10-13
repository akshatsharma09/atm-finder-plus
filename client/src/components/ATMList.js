// src/components/ATMList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ATMCard from './ATMCard';

function ATMList({ searchTerm, atms, setAtms, setSelectedATMId }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/atms') // Replace with your API endpoint
      .then(res => {
        setAtms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [setAtms]);

  const filteredAtms = atms.filter(atm =>
    atm.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atm.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading ATMs...</p>;
  if (filteredAtms.length === 0) return <p>No ATMs found for "{searchTerm}"</p>;

  return (
    <div>
      {filteredAtms.map(atm => (
        <div key={atm.id} onClick={() => setSelectedATMId(atm.id)}>
          <ATMCard atm={atm} />
        </div>
      ))}
    </div>
  );
}

export default ATMList;
