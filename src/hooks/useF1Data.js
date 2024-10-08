import { useState, useEffect } from 'react';
import { fetchRaces, fetchDriverStandings, fetchConstructorStandings } from '../utils/api';

const useF1Data = () => {
  const [races, setRaces] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextRace, setNextRace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [racesData, driversData, constructorsData] = await Promise.all([
          fetchRaces(),
          fetchDriverStandings(),
          fetchConstructorStandings()
        ]);

        setRaces(racesData);
        setDriverStandings(driversData); // Remove the slice to get all driver standings
        setConstructorStandings(constructorsData); // Remove the slice to get all constructor standings

        const now = new Date();
        const nextRace = racesData.find(race => new Date(`${race.date}T${race.time}`) > now);
        setNextRace(nextRace);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { races, driverStandings, constructorStandings, loading, error, nextRace };
};

export default useF1Data;
