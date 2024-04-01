import React from "react";
import { formatDistance, format } from "date-fns";
import "./RaceCard.css";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const RaceCard = ({ race, onClick }) => {
  const { raceName, Circuit, date, time, Qualifying } = race;
  const raceDateTime = new Date(`${date}T${time}`);
  const qualifyingDateTime = new Date(`${Qualifying.date}T${Qualifying.time}`);

  const countdownText = formatDistance(raceDateTime, new Date(), {
    addSuffix: true,
  });

  const isUpcoming = raceDateTime > new Date();
  const isOngoing =
    raceDateTime <= new Date() &&
    new Date() <= new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000);
  const isCompleted =
    new Date() > new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000);

  const raceStatus = isUpcoming
    ? "Upcoming"
    : isOngoing
      ? "Ongoing"
      : isCompleted
        ? "Completed"
        : "";

  const handleClick = () => {
    if (!isUpcoming) {
      onClick();
    }
  };

  return (
    <div
      className={`race-card ${raceStatus.toLowerCase()}`}
      onClick={handleClick}
    >
      <h2>{raceName}</h2>
      <p>{Circuit.circuitName}</p>
      <p>
        Qualifying: {format(qualifyingDateTime, "EEEE, MMMM d, yyyy - h:mm a")}
      </p>
      {isUpcoming && (
        <AddToCalendarButton
          name={`Qualifying: ${raceName}`}
          description={`Qualifying for ${raceName} at ${Circuit.circuitName}`}
          startDate={format(qualifyingDateTime, "yyyy-MM-dd")}
          startTime={format(qualifyingDateTime, "HH:mm", {
            timeZone: "Europe/Oslo",
          })}
          endTime={format(
            new Date(qualifyingDateTime.getTime() + 1 * 60 * 60 * 1000), // Assuming qualifying lasts 1 hour
            "HH:mm",
            { timeZone: "Europe/Oslo" },
          )}
          timeZone="Europe/Oslo"
          location={Circuit.circuitName}
          options={["Apple", "Google", "iCal"]}
          listStyle="overlay"
          buttonStyle="text"
          trigger="click"
          size="4"
          hideBackground
          hideCheckmark
          lightMode="bodyScheme"
          language="en"
        />
      )}
      <p>Race: {format(raceDateTime, "EEEE, MMMM d, yyyy - h:mm a")}</p>
      <p>{countdownText}</p>
      {isUpcoming && (
        <div className="calendar-section">
          <add-to-calendar-button
            name={raceName}
            description={`${raceName} at ${Circuit.circuitName}`}
            startDate={format(raceDateTime, "yyyy-MM-dd")}
            startTime={format(raceDateTime, "HH:mm", {
              timeZone: "Europe/Oslo",
            })}
            endTime={format(
              new Date(raceDateTime.getTime() + 2 * 60 * 60 * 1000),
              "HH:mm",
              { timeZone: "Europe/Oslo" },
            )}
            timeZone="Europe/Oslo"
            location={Circuit.circuitName}
            options="'Apple','Google','iCal'"
            listStyle="overlay"
            buttonStyle="text"
            trigger="click"
            size="4"
            hideBackground
            hideCheckmark
            lightMode="bodyScheme"
            language="en"
          ></add-to-calendar-button>
        </div>
      )}
    </div>
  );
};

export default RaceCard;
