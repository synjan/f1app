import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import RaceCard from './RaceCard'; // Ensure this is pointing to your RaceCard component file
import './F1Season2024.css'; // And this to your CSS file for styling

const F1Season2024 = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ergast.com/api/f1/2024');
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            setError(err.message);
            setLoading(false);
            return;
          }
          const raceData = result.MRData.RaceTable[0].Race.map(race => ({
            raceName: race.RaceName[0],
            circuitName: race.Circuit[0].CircuitName[0],
            date: race.Date[0],
          }));
          setRaces(raceData);
          setLoading(false);
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="races-container">
      {races.map((race, index) => (
        <RaceCard
        key={index}
        raceName={race.raceName}
        circuitName={race.circuitName}
        date={race.date}
      />
      
      ))}
    </div>
  );
};

export default F1Season2024;
