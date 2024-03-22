import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import RaceCard from './RaceCard'; // Ensure this points to your RaceCard component
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
        const season = '2024';
        const response = await axios.get(`https://ergast.com/api/f1/${season}`);
        xml2js.parseString(response.data, async (err, result) => {
          if (err) {
            setError('Failed to parse XML data');
            setLoading(false);
            return;
          }

          let raceData = result.MRData.RaceTable[0].Race.map(race => ({
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
            },
            finished: false, // Default to not finished
            top3: [] // Initialize top3 as empty
          }));

          // Prepare promises for fetching race results in parallel
          const resultsPromises = raceData.map((_, index) => {
            const round = index + 1;
            return axios.get(`https://ergast.com/api/f1/${season}/${round}/results.json`)
              .then(resultsResponse => ({
                index,
                results: resultsResponse.data.MRData.RaceTable.Races[0].Results,
              }))
              .catch(() => ({
                index,
                error: true,
              }));
          });

          // Wait for all promises to settle
          const results = await Promise.allSettled(resultsPromises);

          // Process the results
          results.forEach(result => {
            if (result.status === 'fulfilled' && !result.value.error) {
              const { index, results } = result.value;
              const hasResults = results && results.length > 0;
              raceData[index].finished = hasResults;
              if (hasResults) {
                raceData[index].top3 = results.slice(0, 3).map(driverResult => ({
                  driver: driverResult.Driver.familyName,
                  time: driverResult.Time ? driverResult.Time.time : 'N/A',
                }));
              }
            }
          });

          localStorage.setItem(cacheKey, JSON.stringify(raceData));
          setRaces(raceData);
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getClosestFutureRaceIndex = () => {
    const now = new Date();
    return races
      .map((race, index) => ({
        index,
        date: new Date(race.date),
      }))
      .filter(({ date }) => date > now)
      .sort((a, b) => a.date - b.date)
      .map(({ index }) => index)[0];
  };

  const closestFutureRaceIndex = getClosestFutureRaceIndex();

  if (loading) {
    return <div className="spinner"></div>; // Use the spinner CSS class here
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
          finished={race.finished}
          top3={race.top3}
          isClosestFutureRace={index === closestFutureRaceIndex}
        />
      ))}
    </div>
  );
};

export default F1Season2024;
