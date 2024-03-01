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
        const response = await axios.get('https://ergast.com/api/f1/2024');
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            setError(err.message);
            setLoading(false);
            return;
          }
          // Updated raceData mapping to include practice and qualifying sessions and circuit coordinates
const raceData = result.MRData.RaceTable[0].Race.map(race => ({
  raceName: race.RaceName[0],
  circuitName: race.Circuit[0].CircuitName[0],
  locality: race.Circuit[0].Location[0].Locality[0],
  country: race.Circuit[0].Location[0].Country[0],
  date: race.Date[0],
  time: race.Time ? race.Time[0] : null,

  
  firstPractice: race.FirstPractice ? {date: race.FirstPractice[0].Date[0], time: race.FirstPractice[0].Time[0]} : null,
  secondPractice: race.SecondPractice ? {date: race.SecondPractice[0].Date[0], time: race.SecondPractice[0].Time[0]} : null,
  thirdPractice: race.ThirdPractice ? {date: race.ThirdPractice[0].Date[0], time: race.ThirdPractice[0].Time[0]} : null,
  qualifying: race.Qualifying ? {date: race.Qualifying[0].Date[0], time: race.Qualifying[0].Time[0]} : null,
  
  coordinates: {
    lat: race.Circuit[0].Location[0].$.lat,
    long: race.Circuit[0].Location[0].$.long
  }
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
        locality={race.locality}
        country={race.country}
        date={race.date}
        time={race.time}
        firstPractice={race.firstPractice}
        secondPractice={race.secondPractice}
        thirdPractice={race.thirdPractice}
        qualifying={race.qualifying}
        coordinates={race.coordinates} 
      />
      ))}
    </div>
  );
};

export default F1Season2024;
