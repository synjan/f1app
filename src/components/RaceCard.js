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
        <AddToCalendarButton
          name={raceName}
          startDate={format(raceDateTime, "yyyy-MM-dd")} // Ensure date is in ISO format
          startTime={format(raceDateTime, "HH:mm", { timeZone: "Europe/Oslo" })} // Format startTime in 24-hour format with Oslo time zone
          endTime={format(
            new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000),
            "HH:mm",
            { timeZone: "Europe/Oslo" }, // Ensure endTime is calculated with the Oslo time zone
          )}
          timeZone="Europe/Oslo" // Set the timeZone prop to Europe/Oslo
          description={`${raceName} at ${Circuit.circuitName}`}
          options={["Apple", "Google", "iCal"]}
          buttonsList
          hideTextLabelButton
          buttonStyle="round"
          lightMode="bodyScheme"
        />
      )}
    </div>
  );
};

export default RaceCard;
