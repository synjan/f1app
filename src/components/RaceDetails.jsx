import React, { useState, useEffect } from 'react';
import CircuitInfo from './CircuitInfo';
import RaceWeekendSchedule from './RaceWeekendSchedule';
import WeatherForecast from './WeatherForecast';

const RaceDetails = ({ race, onClose, isPastRace }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (isPastRace) {
      fetchRaceResults(race.season, race.round);
    }
  }, [race, isPastRace]);

  const fetchRaceResults = async (season, round) => {
    try {
      const response = await fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`);
      const data = await response.json();
      setResults(data.MRData.RaceTable.Races[0].Results);
    } catch (error) {
      console.error('Error fetching race results:', error);
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{race.raceName} Details</h3>
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          Close
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <CircuitInfo circuit={race.Circuit} />
        <RaceWeekendSchedule race={race} />
      </div>
      {isPastRace && results && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Race Results</h4>
          <ul className="space-y-2">
            {results.slice(0, 10).map((result) => (
              <li key={result.position} className="flex justify-between">
                <span>{result.position}. {result.Driver.givenName} {result.Driver.familyName}</span>
                <span>{result.Time ? result.Time.time : 'DNF'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4">
        <WeatherForecast location={`${race.Circuit.Location.locality},${race.Circuit.Location.country}`} />
      </div>
    </div>
  );
};

export default RaceDetails;
