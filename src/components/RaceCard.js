import React from "react";
import { formatDistance, format } from "date-fns";
import "./RaceCard.css";
import { AddToCalendarButton } from "add-to-calendar-button-react";

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
      {isUpcoming && (
        <div className="calendar-section">
          <h4>Add to Calendar</h4>
          <p>Click the button below to add this race to your preferred calendar:</p>
          <AddToCalendarButton
            name={raceName}
            startDate={format(raceDateTime, "yyyy-MM-dd")}
            startTime={format(raceDateTime, "HH:mm", { timeZone: "Europe/Oslo" })}
            endTime={format(
              new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000),
              "HH:mm",
              { timeZone: "Europe/Oslo" }
            )}
            timeZone="Europe/Oslo"
            description={`${raceName} at ${Circuit.circuitName}`}
            options={["Apple", "Google", "iCal"]}
            buttonsList
            hideTextLabelButton
            buttonStyle="round"
            lightMode="bodyScheme"
          />
        </div>
      )}
    </div>
  );
};

export default RaceCard;