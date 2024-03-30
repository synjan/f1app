import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RaceCard from "./components/RaceCard";
import RaceDetail from "./components/RaceDetail";
import "./App.css";

const App = () => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const raceListRef = useRef(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get(
          "https://ergast.com/api/f1/current.json",
        );
        setRaces(response.data.MRData.RaceTable.Races);
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    };

    fetchRaces();
  }, []);

  useEffect(() => {
    const today = new Date();
    const nextRaceIndex = races.findIndex(
      (race) => new Date(race.date) > today,
    );

    if (nextRaceIndex !== -1 && raceListRef.current) {
      const raceCardElement = raceListRef.current.children[nextRaceIndex];
      raceCardElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [races]);

  const handleRaceClick = (race) => {
    setSelectedRace(race);
  };

  return (
    <div className="app">
      <h1>F1App</h1>
      {selectedRace ? (
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
  );
};

export default App;
