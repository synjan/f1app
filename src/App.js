import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RaceCard from "./components/RaceCard";
import RaceDetail from "./components/RaceDetail";
import LoadingScreen from "react-loading-screen"; // Import LoadingScreen component
import "./App.css";

const App = () => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const raceListRef = useRef(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://ergast.com/api/f1/current.json",
        );
        setRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching races:", error);
        setIsLoading(false);
        setError(
          error.response && error.response.status === 503
            ? "Service Unavailable. Please try again later."
            : "An error occurred. Please try again.",
        );
      }
    };

    fetchRaces();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const today = new Date();
      const nextRaceIndex = races.findIndex(
        (race) => new Date(race.date) > today,
      );
      if (nextRaceIndex !== -1 && raceListRef.current) {
        const raceCardElement = raceListRef.current.children[nextRaceIndex];
        raceCardElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [races, isLoading]);

  const handleRaceClick = (race) => {
    setSelectedRace(race);
  };

  // Wrap the entire return statement with LoadingScreen component
  return (
    <LoadingScreen
      loading={isLoading}
      bgColor="#f1f1f1"
      spinnerColor="#9ee5f8"
      textColor="#676767"
      logoSrc="https://upload.wikimedia.org/wikipedia/commons/8/80/FIA_Formula_One_World_Championship_Logo.svg" // Ensure you have 'logo.png' in your public folder or update this path
      text="Loading..."
    >
      <div className="app">
        <h1>F1App</h1>
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : selectedRace ? (
          <RaceDetail
            race={selectedRace}
            onBackClick={() => setSelectedRace(null)}
          />
        ) : (
          <div className="race-list" ref={raceListRef}>
            {races.map((race) => (
              <RaceCard
                key={race.round}
                race={race}
                onClick={() => handleRaceClick(race)}
              />
            ))}
          </div>
        )}
      </div>
    </LoadingScreen>
  );
};

export default App;
