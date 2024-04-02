import React from "react";
import { formatDistance, format } from "date-fns";
import "./RaceCard.css";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const TIME_ZONE = "Europe/Oslo";
const RACE_DURATION_HRS = 2 * 60 * 60 * 1000;
const QUALIFYING_SPRINT_DURATION_HRS = 1 * 60 * 60 * 1000;

const RaceCard = ({ race, onClick }) => {
  const { raceName, Circuit, date, time, Qualifying, Sprint } = race;
  const raceDateTime = new Date(`${date}T${time}`);
  const qualifyingDateTime = new Date(`${Qualifying.date}T${Qualifying.time}`);
  const sprintDateTime = Sprint
    ? new Date(`${Sprint.date}T${Sprint.time}`)
    : null;

  const countdownText = formatDistance(raceDateTime, new Date(), {
    addSuffix: true,
  });

  const isUpcoming = raceDateTime > new Date();
  const isOngoing =
    raceDateTime <= new Date() &&
    new Date() <= new Date(raceDateTime.getTime() + RACE_DURATION_HRS);
  const isCompleted =
    new Date() > new Date(raceDateTime.getTime() + RACE_DURATION_HRS);

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

  const calendarButtonProps = {
    listStyle: "overlay",
    buttonStyle: "text",
    trigger: "click",
    size: "4",
    hideBackground: true,
    hideCheckmark: true,
    lightMode: "bodyScheme",
    language: "en",
    options: ["Apple", "Google", "iCal"],
    label: "Calendar",
    timeZone: TIME_ZONE,
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
          {...calendarButtonProps}
          name={`Qualifying: ${raceName}`}
          description={`Qualifying for ${raceName} at ${Circuit.circuitName}`}
          startDate={format(qualifyingDateTime, "yyyy-MM-dd")}
          startTime={format(qualifyingDateTime, "HH:mm")}
          endTime={format(
            new Date(qualifyingDateTime.getTime() + QUALIFYING_SPRINT_DURATION_HRS),
            "HH:mm"
          )}
          location={Circuit.circuitName}
        />
      )}
      {Sprint && (
        <>
          <p>Sprint: {format(sprintDateTime, "EEEE, MMMM d, yyyy - h:mm a")}</p>
          {isUpcoming && (
            <AddToCalendarButton
              {...calendarButtonProps}
              name={`Sprint: ${raceName}`}
              description={`Sprint for ${raceName} at ${Circuit.circuitName}`}
              startDate={format(sprintDateTime, "yyyy-MM-dd")}
              startTime={format(sprintDateTime, "HH:mm")}
              endTime={format(
                new Date(sprintDateTime.getTime() + QUALIFYING_SPRINT_DURATION_HRS),
                "HH:mm"
              )}
              location={Circuit.circuitName}
            />
          )}
        </>
      )}
      <p>Race: {format(raceDateTime, "EEEE, MMMM d, yyyy - h:mm a")}</p>
      <p>{countdownText}</p>
      {isUpcoming && (
        <div className="calendar-section">
          <AddToCalendarButton
            {...calendarButtonProps}
            name={raceName}
            description={`${raceName} at ${Circuit.circuitName}`}
            startDate={format(raceDateTime, "yyyy-MM-dd")}
            startTime={format(raceDateTime, "HH:mm")}
            endTime={format(
              new Date(raceDateTime.getTime() + RACE_DURATION_HRS),
              "HH:mm"
            )}
            location={Circuit.circuitName}
          />
        </div>
      )}
    </div>
  );
};

export default RaceCard;


