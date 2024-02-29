// RaceCard.js
import React, { useState, useEffect } from 'react';
import './RaceCard.css';
import { calculateCountdown, formatSession } from './RaceUtils';

const RaceCard = ({
  raceName,
  circuitName,
  locality,
  country,
  date,
  time,
  firstPractice,
  secondPractice,
  thirdPractice,
  qualifying,
  coordinates
}) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [raceCountdown, setRaceCountdown] = useState(calculateCountdown(`${date}T${time}`));

  useEffect(() => {
    const interval = setInterval(() => {
      setRaceCountdown(calculateCountdown(`${date}T${time}`));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [date, time]); // Including 'date' and 'time' in the dependency array
  
  const displaySessionInfo = (session, sessionName) => {
    if (!session || !session.date || !session.time) return `${sessionName} is not scheduled.`;
    const sessionDateTime = new Date(`${session.date}T${session.time}`);
    const now = new Date();
  
    if (sessionDateTime <= now) {
      return `${sessionName} has already started or finished.`;
    } else {
      const localTime = formatSession(session, 'UTC');
      const userTime = formatSession(session, userTimeZone);
      const countdown = calculateCountdown(sessionDateTime.toISOString());
      return `${sessionName} starts in ${countdown}. It starts at ${userTime} your time (${localTime}).`;
    }
  };
  
  // Ensure the coordinates are correctly validated or handled to avoid errors
  const mapImageUrl = `https://api.mapbox.com/styles/v1/superjan/clt73t4aa00yi01qua3sbbo1t/static/${coordinates.long},${coordinates.lat},10/500x300@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

  return (
    <div className="race-card" style={{ backgroundImage: `url(${mapImageUrl})` }}>
      <div className="race-card-overlay"></div>
      <div className="race-card-content">
        <h3 className="race-name">{raceName}</h3>
        <p className="circuit-name">{circuitName} - {locality}, {country}</p>
        
        <p className="date">Race Date: {date}</p>
        <p className="time">Local Time: {formatSession({date, time}, 'UTC')}</p>
        <p className="user-time">Your Time: {formatSession({date, time}, userTimeZone)}</p>
        <p className="race-countdown">Race Countdown: {raceCountdown}</p>
        
        <p className="quali">{displaySessionInfo(qualifying, "Qualifying")}</p>
        
        <p className='practice'>{displaySessionInfo(firstPractice, "First Practice")}</p>
        <p className='practice'>{displaySessionInfo(secondPractice, "Second Practice")}</p>
        <p className='practice'>{displaySessionInfo(thirdPractice, "Third Practice")}</p>
      </div>
    </div>
  );
};

export default RaceCard;
