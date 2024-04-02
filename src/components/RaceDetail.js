import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDistance } from "date-fns";
import { TailSpin } from "react-loader-spinner";
import "./RaceDetail.css";

// Extracts BackButton for reuse
const BackButton = ({ onClick }) => (
  <button className="back-button" onClick={onClick}>
    Back
  </button>
);

// Custom hook for data fetching
const useRaceData = (race) => {
  const [data, setData] = useState({
    raceResults: null,
    qualifyingResults: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prevState) => ({ ...prevState, isLoading: true })); // Using functional update
      try {
        const raceResultsUrl = `${process.env.REACT_APP_API_BASE_URL}/${race.season}/${race.round}/results.json`;
        const qualifyingResultsUrl = `${process.env.REACT_APP_API_BASE_URL}/${race.season}/${race.round}/qualifying.json`;
        const responses = await Promise.all([
          axios.get(raceResultsUrl),
          axios.get(qualifyingResultsUrl),
        ]);
        setData({
          raceResults: responses[0].data.MRData.RaceTable.Races[0].Results,
          qualifyingResults:
            responses[1].data.MRData.RaceTable.Races[0].QualifyingResults,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData((prevState) => ({
          ...prevState,
          isLoading: false,
          error: "Failed to fetch data. Please try again later.",
        })); // Also using functional update here
      }
    };

    if (new Date(race.date) < new Date()) {
      fetchData();
    } else {
      setData((prevState) => ({ ...prevState, isLoading: false })); // And here
    }
  }, [race]);

  return data;
};

const RaceDetail = ({ race, onBackClick }) => {
  const { raceResults, qualifyingResults, isLoading, error } =
    useRaceData(race);

  // Utility functions...
  const formatSessionDate = (sessionDate) =>
    sessionDate
      ? format(new Date(sessionDate), "MMMM d, yyyy")
      : "Date not available";
  const formatSessionTime = (sessionTime) =>
    sessionTime
      ? format(new Date(`${race.date}T${sessionTime}`), "h:mm a")
      : "Time not available";
  const getSessionCountdown = (sessionDate) => {
    const currentDate = new Date();
    const sessionDateTime = new Date(sessionDate);
    return sessionDateTime > currentDate
      ? formatDistance(sessionDateTime, currentDate, { addSuffix: true })
      : null;
  };

  // Component rendering logic...
  if (isLoading) {
    return (
      <div className="loading">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <BackButton onClick={onBackClick} />
      </div>
    );
  }

  const renderSessionInfo = (
    sessionName,
    sessionDate,
    sessionTime,
    results,
  ) => (
    <div>
      <h3>{sessionName}</h3>
      <p>{formatSessionDate(sessionDate)}</p>
      <p>Time: {formatSessionTime(sessionTime)}</p>
      {getSessionCountdown(sessionDate) && (
        <p>Countdown: {getSessionCountdown(sessionDate)}</p>
      )}
      {results ? (
        <ul>
          {results.map((result) => (
            <li key={result.position}>
              {result.position}. {result.Driver.givenName}{" "}
              {result.Driver.familyName} ({result.Constructor.name})
            </li>
          ))}
        </ul>
      ) : (
        <p>Results not available.</p>
      )}
    </div>
  );

  return (
    <div className="race-detail">
      <BackButton onClick={onBackClick} />
      <h2>{race.raceName}</h2>
      <p>{race.Circuit.circuitName}</p>
      <p>{formatSessionDate(race.date)}</p>
      {renderSessionInfo(
        "Qualifying",
        race.Qualifying.date,
        race.Qualifying.time,
        qualifyingResults,
      )}
      {renderSessionInfo("Race", race.date, race.time, raceResults)}
      <BackButton onClick={onBackClick} />
    </div>
  );
};

export default RaceDetail;
