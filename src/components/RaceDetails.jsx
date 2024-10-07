import React from 'react';
import CircuitInfo from './CircuitInfo';
import RaceWeekendSchedule from './RaceWeekendSchedule';
import WeatherForecast from './WeatherForecast';

const RaceDetails = ({ race, onClose }) => {
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
      <div className="mt-4">
        <WeatherForecast location={`${race.Circuit.Location.locality},${race.Circuit.Location.country}`} />
      </div>
    </div>
  );
};

export default RaceDetails;
