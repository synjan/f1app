import React, { useState, useEffect } from "react";
import "./RaceCard.css";
import { calculateCountdown, formatSession } from "./RaceUtils";

const countryCodes = {
  Bahrain: "BH",
  "Saudi Arabia": "SA",
  Australia: "AU",
  Japan: "JP",
  China: "CN",
  USA: "US",
  Italy: "IT",
  Monaco: "MC",
  Canada: "CA",
  Spain: "ES",
  Austria: "AT",
  UK: "GB",
  Hungary: "HU",
  Belgium: "BE",
  Netherlands: "NL",
  Azerbaijan: "AZ",
  Singapore: "SG",
  Mexico: "MX",
  Brazil: "BR",
  "United States": "US",
  Qatar: "QA",
  UAE: "AE",
};

const countryFontClasses = {
  Bahrain: "Amiri",
  "Saudi Arabia": "Amiri",
  Qatar: "Amiri",
  UAE: "Amiri",
  Australia: "Arimo", // Alternative to 'Outback'
  Japan: "M_PLUS_Rounded_1c",
  China: "Noto_Sans_SC",
  USA: "Libre_Franklin",
  "United States": "Libre_Franklin", // Duplicate for consistency
  Italy: "Cinzel",
  Monaco: "Playfair_Display",
  Canada: "Open_Sans",
  Spain: "Lobster",
  Austria: "Merriweather",
  UK: "Libre_Baskerville", // Use 'Libre Baskerville' as alternative to 'Baskerville'
  Hungary: "Lora",
  Belgium: "Alegreya",
  Netherlands: "Josefin_Sans",
  Azerbaijan: "Rubik",
  Singapore: "Poppins",
  Mexico: "Abril_Fatface",
  Brazil: "Kaushan_Script",
};

const formatDateWithDay = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
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
  coordinates,
  finished,
  top3,
  isClosestFutureRace,
}) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [raceCountdown, setRaceCountdown] = useState(
    calculateCountdown(`${date}T${time}`),
  );
  const countryCode = countryCodes[country];
  const fontClass = countryFontClasses[country] || "";
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRaceCountdown(calculateCountdown(`${date}T${time}`));
    }, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const mapImageUrl = `https://api.mapbox.com/styles/v1/superjan/clt73t4aa00yi01qua3sbbo1t/static/${coordinates.long},${coordinates.lat},10/500x300@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;
  const cardClasses = `race-card ${isClosestFutureRace ? "closest-future-race" : ""} ${fontClass} ${finished ? "finished-race" : ""}`; // Add 'finished-race' class for finished races

  return (
    <div
      className={cardClasses}
      style={{ backgroundImage: `url(${mapImageUrl})` }}
      onClick={toggleCollapse}
    >
      <div className="race-card-overlay"></div>
      <div className="race-card-content">
        <h3 className="race-name">
          {raceName}
          {finished ? (
            <>
              <p className="race-summary finished-summary">
                Winner: {top3 ? top3[0].driver : "N/A"}
              </p>
            </>
          ) : (
            <>
              <p className="raceCountdown">{raceCountdown}</p>
              <div className="flag-container">
                <img
                  src={`https://flagsapi.com/${countryCode}/flat/64.png`}
                  alt={`${country} flag`}
                  style={{ width: "64px", height: "64px" }}
                />
              </div>
            </>
          )}
        </h3>
        {!isCollapsed && (
          <>
            <p className="circuit-name">
              {circuitName} - {locality}, {country}
            </p>
            <p className="date">Race Date: {formatDateWithDay(date)}</p>
            <p className="time">
              Local Time: {formatSession({ date, time }, "UTC")}
            </p>
            <p className="user-time">
              Your Time: {formatSession({ date, time }, userTimeZone)}
            </p>
            {finished && top3 && (
              <>
                <p className="finished-message">This race has concluded.</p>
                <div className="top-drivers">
                  <h4>Top 3 Drivers:</h4>
                  <ul>
                    {top3.map((driver, index) => (
                      <li key={index}>
                        {driver.position}. {driver.driver} - {driver.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {!finished && (
              <>
                <p className="quali">
                  {qualifying &&
                    `Qualifying starts at ${formatSession(qualifying, userTimeZone)}`}
                </p>
                <p className="practice">
                  {firstPractice &&
                    `First Practice starts at ${formatSession(firstPractice, userTimeZone)}`}
                </p>
                <p className="practice">
                  {secondPractice &&
                    `Second Practice starts at ${formatSession(secondPractice, userTimeZone)}`}
                </p>
                <p className="practice">
                  {thirdPractice &&
                    `Third Practice starts at ${formatSession(thirdPractice, userTimeZone)}`}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RaceCard;