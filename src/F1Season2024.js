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
          if (err) throw err; // Propagates parsing errors
          
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
            finished: false // Default to not finished
          }));

          // Now, check if each race has finished by looking for results
for (let i = 0; i < raceData.length; i++) {
  const round = i + 1; // Assuming round numbers are sequential and start at 1
  try {
    const resultsResponse = await axios.get(`https://ergast.com/api/f1/${season}/${round}/results.json`);
    const results = resultsResponse.data.MRData.RaceTable.Races[0].Results;
    if (results.length > 0) {
      raceData[i].finished = true; // Update if results are present

      // Extract top 3 drivers' last names and their times (assuming they exist)
      raceData[i].top3 = results.slice(0, 3).map(driverResult => ({
        driver: driverResult.Driver.familyName,
        time: driverResult.Time ? driverResult.Time.time : 'N/A', // Handling cases where Time might not exist
      }));
    }
  } catch (resultsError) {
    console.error(`Error fetching results for round ${round}:`, resultsError);
    // Not updating the finished status or top3 in case of an error
  }
}

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
    finished={race.finished}
    top3={race.top3} // Add this line to pass top 3 drivers to the RaceCard
  />
))}

    </div>
  );
};

export default F1Season2024;
