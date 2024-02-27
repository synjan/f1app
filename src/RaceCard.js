import React from 'react';
import './RaceCard.css'; // Ensure your CSS is updated to style these new elements if needed

// Existing formatSession function
const formatSession = (session) => {
  return session ? `${session.date} ${session.time}` : 'Not scheduled';
};

// Function to format the display of coordinates

const RaceCard = ({
  raceName, 
  circuitName, 
  date, 
  firstPractice, 
  secondPractice, 
  thirdPractice, 
  qualifying, 
  coordinates 
}) => {
  return (
    <div className="race-card">
      <h3 className="race-name">{raceName}</h3>
      <p className="circuit-name">{circuitName}</p>
      <p className="date">Race Date: {date}</p>
      {/* Displaying practice and qualifying sessions */}
      <p className="session first-practice">First Practice: {formatSession(firstPractice)}</p>
      <p className="session second-practice">Second Practice: {formatSession(secondPractice)}</p>
      <p className="session third-practice">Third Practice: {formatSession(thirdPractice)}</p>
      <p className="session qualifying">Qualifying: {formatSession(qualifying)}</p>
      {/* Displaying coordinates */}
      <p>Coordinates: Lat {coordinates.lat}, Long {coordinates.long}</p>
      </div>
  );
};

export default RaceCard;
