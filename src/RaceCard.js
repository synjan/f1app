// RaceCard.js

import React from 'react';
import './RaceCard.css';

const RaceCard = ({ raceName, circuitName, date }) => {
  return (
    <div className="race-card">
      <h3 className="race-name">{raceName}</h3>
      <p className="circuit-name">{circuitName}</p>
      <p className="date">{date}</p>
    </div>
  );
};

export default RaceCard;
