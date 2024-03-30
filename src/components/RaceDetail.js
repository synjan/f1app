import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDistance } from "date-fns";
import "./RaceDetail.css";

const RaceDetail = ({ race, onBackClick }) => {
  const [raceResults, setRaceResults] = useState(null);
  const [practiceResults, setPracticeResults] = useState(null);
  const [qualifyingResults, setQualifyingResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const response = await axios.get(
          `https://ergast.com/api/f1/${race.season}/${race.round}/results.json`
        );
        setRaceResults(response.data.MRData.RaceTable.Races[0].Results);
      } catch (error) {
        setError("Failed to fetch race results. Please try again.");
        console.error("Error fetching race results:", error);
      }
    };

    const fetchPracticeResults = async () => {
      try {
        const response = await axios.get(
          `https://ergast.com/api/f1/${race.season}/${race.round}/qualifying.json`
        );
        setPracticeResults(
          response.data.MRData.RaceTable.Races[0].QualifyingResults
        );
      } catch (error) {
        setError("Failed to fetch practice results. Please try again.");
        console.error("Error fetching practice results:", error);
      }
    };

    const fetchQualifyingResults = async () => {
      try {
        const response = await axios.get(
          `https://ergast.com/api/f1/${race.season}/${race.round}/qualifying.json`
        );
        setQualifyingResults(
          response.data.MRData.RaceTable.Races[0].QualifyingResults
        );
      } catch (error) {
        setError("Failed to fetch qualifying results. Please try again.");
        console.error("Error fetching qualifying results:", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (new Date(race.date) < new Date()) {
        await Promise.all([
          fetchRaceResults(),
          fetchPracticeResults(),
          fetchQualifyingResults(),
        ]);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [race]);

  const getSessionCountdown = (sessionDate) => {
    const currentDate = new Date();
    const sessionDateTime = new Date(sessionDate);

    if (sessionDateTime > currentDate) {
      return formatDistance(sessionDateTime, currentDate, { addSuffix: true });
    }
    return null;
  };

  const formatSessionDate = (sessionDate) => {
    return format(new Date(sessionDate), "MMMM d, yyyy");
  };

  const renderSessionInfo = (sessionName, sessionDate, results) => {
    const countdown = getSessionCountdown(sessionDate);
    const formattedDate = formatSessionDate(sessionDate);

    return (
      <div>
        <h3>{sessionName}</h3>
        <p>{formattedDate}</p>
        {countdown && <p>Countdown: {countdown}</p>}
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
          <p>Results not available yet.</p>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading">Loading race details...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  }

  return (
    <div className="race-detail">
      <h2>{race.raceName}</h2>
      <p>{race.Circuit.circuitName}</p>
      <p>{formatSessionDate(race.date)}</p>
      {renderSessionInfo("Practice", race.FirstPractice?.date, practiceResults)}
      {renderSessionInfo("Qualifying", race.Qualifying?.date, qualifyingResults)}
      {renderSessionInfo("Race", race.date, raceResults)}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export default RaceDetail;