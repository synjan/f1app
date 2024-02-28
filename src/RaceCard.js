import React, { useState, useEffect } from 'react';
import './RaceCard.css';

// Calculates countdown to a session
const calculateCountdown = (sessionDateTime) => {
  const now = new Date();
  const sessionDate = new Date(sessionDateTime);
  const timeDifference = sessionDate - now;

  if (timeDifference <= 0) {
    return 'Already started';
  }

  let seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours %= 24;
  minutes %= 60;
  seconds %= 60;

  return `${days}d ${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
};

// Checks for a valid countdown format
const isValidCountdown = (countdown) => {
  return !countdown.includes("NaN");
};

// Formats session times
const formatSession = (session, timeZone = 'UTC') => {
  if (!session || !session.date || !session.time) return 'Not scheduled';
  const sessionDateTime = new Date(`${session.date}T${session.time}`);
  if (isNaN(sessionDateTime.getTime())) return 'Not scheduled';
  return sessionDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone });
};

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
  }, [date, time]);

  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${coordinates.long},${coordinates.lat},14/500x300@2x?access_token=pk.eyJ1Ijoic3VwZXJqYW4iLCJhIjoiY2x0NW55eHF1MDJndDJqcGR4eGM0b3l2dSJ9.5Q_clHAuM3xLPITsUQ1HUg`;

  const displaySessionInfo = (session, sessionName) => {
    if (!session || !session.date || !session.time) return `${sessionName}: Not scheduled`;
    const localTime = formatSession(session, 'UTC');
    const userTime = formatSession(session, userTimeZone);
    const countdown = calculateCountdown(new Date(`${session.date}T${session.time}`).toLocaleString('en-US', { timeZone: userTimeZone }));
    return `${sessionName} - Countdown: ${countdown} - Your time: ${userTime} - Local time: ${localTime}`;
  };

  return (
    <div className="race-card" style={{ backgroundImage: `url(${mapImageUrl})` }}>
      <div className="race-card-overlay"></div>
      <div className="race-card-content">
        <h3 className="race-name">{raceName}</h3>
        <p className="circuit-name">{circuitName}</p>
        <p className="locality">{locality}, {country}</p>
        <p className="date">Race Date: {date}</p>
        <p className="time">Local Time: {formatSession({date, time}, 'UTC')}</p>
        <p className="user-time">Your Time: {formatSession({date, time}, userTimeZone)}</p>
        {isValidCountdown(raceCountdown) && <p className="race-countdown">Race Countdown: {raceCountdown}</p>}
        <p className="quali">{displaySessionInfo(qualifying, "Qualifying")}</p>
        
        <p>{displaySessionInfo(firstPractice, "First Practice")}</p>
        <p>{displaySessionInfo(secondPractice, "Second Practice")}</p>
        <p>{displaySessionInfo(thirdPractice, "Third Practice")}</p>
        
        {/* <p>Coordinates: Lat {coordinates.lat}, Long {coordinates.long}</p> */}
      </div>
    </div>
  );
};

export default RaceCard;