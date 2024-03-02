import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import RaceCard from './RaceCard'; // Make sure this points to your RaceCard component
import './F1Season2024.css'; // Ensure this points to your CSS file

const F1Season2024 = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cacheKey = 'f1RacesData2024';
      try {
        const response = await axios.get('https://ergast.com/api/f1/2024');
        xml2js.parseString(response.data, (err, result) => {
          if (err) throw err; // Propagates parsing errors
          
          const raceData = result.MRData.RaceTable[0].Race.map(race => ({
            raceName: race.RaceName[0],
            circuitName: race.Circuit[0].CircuitName[0],
            locality: race.Circuit[0].Location[0].Locality[0],
            country: race.Circuit[0].Location[0].Country[0],
            date: race.Date[0],
            time: race.Time ? race.Time[0] : null,
            firstPractice: race.FirstPractice ? { date: race.FirstPractice[0].Date[0], time: race.FirstPractice[0].Time[0] } : null,
            secondPractice: race.SecondPractice ? { date: race.SecondPractice[0].Date[0], time: race.SecondPractice[0].Time[0] } : null,
            thirdPractice: race.ThirdPractice ? { date: race.ThirdPractice[0].Date[0], time: race.ThirdPractice[0].Time[0] } : null,
            qualifying: race.Qualifying ? { date: race.Qualifying[0].Date[0], time: race.Qualifying[0].Time[0] } : null,
            coordinates: {
              lat: race.Circuit[0].Location[0].$.lat,
              long: race.Circuit[0].Location[0].$.long
            }
          }));

          localStorage.setItem(cacheKey, JSON.stringify(raceData)); // Update cache with new data
          setRaces(raceData);
          setLoading(false);
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 503) {
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            setRaces(JSON.parse(cachedData));
            setError('Data loaded from cache due to server issues.');
          } else {
            setError('Service temporarily unavailable and no cached data found.');
          }
        } else {
          setError(error.message || 'An unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
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
