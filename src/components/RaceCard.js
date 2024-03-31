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
          startDate={date}
          startTime={format(raceDateTime, "HH:mm")}
          endTime={format(
            new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000),
            "HH:mm",
          )}
          timeZone="UTC"
          description={`${raceName} at ${Circuit.circuitName}`}
          options={["Apple", "Google", "iCal", "Outlook.com"]}
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
