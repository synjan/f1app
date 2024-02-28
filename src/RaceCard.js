import React from 'react';
import './RaceCard.css'; // Ensure your CSS is updated to style these new elements if needed

// Existing function to format session details
const formatSession = (session) => {
  return session ? `${session.date} ${session.time}` : 'Not scheduled';
};

const RaceCard = ({
  raceName, 
  circuitName, 
  date,
  time, // Assuming this is a string like "15:00:00Z" or directly the time
  firstPractice, 
  secondPractice, 
  thirdPractice, 
  qualifying, 
  coordinates 
}) => {
  // Function to display the race time or 'Not scheduled' if not provided
  const displayRaceTime = (time) => time ? `Race Time: ${time}` : 'Race Time: Not scheduled';

  return (
    <div className="race-card">
      <h3 className="race-name">{raceName}</h3>
      <p className="circuit-name">{circuitName}</p>
      <p className="date">Race Date: {date}</p>
      <p className="time">{displayRaceTime(time)}</p> {/* Updated to use displayRaceTime */}
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
