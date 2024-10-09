import React, { useState, useEffect } from 'react';
import CircuitInfo from './CircuitInfo';
import RaceWeekendSchedule from './RaceWeekendSchedule';
import WeatherForecast from './WeatherForecast';
import { formatDateTimeNordic } from '../utils/dateUtils';

const RaceDetails = ({ race, onClose, isPastRace }) => {
  const [results, setResults] = useState(null);
  const [fastestLap, setFastestLap] = useState(null);

  useEffect(() => {
    if (isPastRace) {
      fetchRaceResults(race.season, race.round);
    }
  }, [race, isPastRace]);

  const fetchRaceResults = async (season, round) => {
    try {
      const response = await fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`);
      const data = await response.json();
      const raceResults = data.MRData.RaceTable.Races[0].Results;
      setResults(raceResults);
      setFastestLap(raceResults.reduce((fastest, current) => 
        (current.FastestLap && (!fastest || current.FastestLap.Time.time < fastest.FastestLap.Time.time)) 
          ? current 
          : fastest
      , null));
    } catch (error) {
      console.error('Error fetching race results:', error);
    }
  };

  return (
    <div className="bg-background text-foreground p-4 md:p-8 lg:p-12 rounded-lg shadow-lg mt-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">{race.raceName}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-base sm:text-mobile-base md:text-lg"
          >
            Close
          </button>
        </div>
        
        {fastestLap && (
          <div className="mb-4 text-right">
            <span className="font-semibold">Fastest Lap: </span>
            <span>{fastestLap.FastestLap.Time.time}</span>
          </div>
        )}

        {isPastRace && results && (
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Pos</th>
                  <th className="py-2">Driver</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Speed</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.position} className="border-t">
                    <td className="py-2">{result.position}</td>
                    <td className="py-2">
                      <span className="inline-block bg-gray-200 rounded-full w-6 h-6 text-center mr-2">
                        {result.Driver.permanentNumber}
                      </span>
                      {result.Driver.givenName} {result.Driver.familyName}
                    </td>
                    <td className="py-2">{result.Time ? result.Time.time : (result.status === 'Finished' ? '+1 Lap' : result.status)}</td>
                    <td className="py-2">{result.FastestLap ? `${result.FastestLap.AverageSpeed.speed} km/h` : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <CircuitInfo circuit={race.Circuit} />
          <div>
            <h3 className="text-2xl font-bold mb-4">Race Weekend Schedule</h3>
            <RaceWeekendSchedule race={race} />
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default RaceDetails;
