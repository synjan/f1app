import React from "react";
import { formatDistance, format } from "date-fns";
import "./RaceCard.css";

const RaceCard = ({ race, onClick }) => {
  const { raceName, Circuit, date, time } = race;
  const raceDateTime = new Date(`${date}T${time}`);
  const countdownText = formatDistance(raceDateTime, new Date(), {
    addSuffix: true,
  });

  const isUpcoming = raceDateTime > new Date();
  const isOngoing =
    raceDateTime <= new Date() &&
    new Date() <= new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000); // Assuming a race lasts for 2 hours
  const isCompleted =
    new Date() > new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000);

  const raceStatus = isUpcoming
    ? "Upcoming"
    : isOngoing
      ? "Ongoing"
      : isCompleted
        ? "Completed"
        : "";

  return (
    <div className={`race-card ${raceStatus.toLowerCase()}`} onClick={onClick}>
      <h2>{raceName}</h2>
      <p>{Circuit.circuitName}</p>
      <p>{format(raceDateTime, "EEEE, MMMM d, yyyy")}</p>
      <p>{format(raceDateTime, "h:mm a")}</p>
      <p>{countdownText}</p>
      <span className="race-status">{raceStatus}</span>
    </div>
  );
};

export default RaceCard;
