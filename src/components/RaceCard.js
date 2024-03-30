import React from "react";
import { formatDistance } from "date-fns";
import "./RaceCard.css";

const RaceCard = ({ race, onClick }) => {
  const { raceName, Circuit, date, time } = race;
  const raceDateTime = new Date(`${date}T${time}`);
  const countdownText = formatDistance(raceDateTime, new Date(), {
    addSuffix: true,
  });

  return (
    <div className="race-card" onClick={onClick}>
      <h2>{raceName}</h2>
      <p>{Circuit.circuitName}</p>
      <p>{countdownText}</p>
    </div>
  );
};

export default RaceCard;
