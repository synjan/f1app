import React from 'react';
import { formatDateTimeNordic } from '../utils/dateUtils';

const RaceWeekendSchedule = ({ race }) => {
  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Race Weekend Schedule</h3>
      <div className="space-y-2">
        {race.FirstPractice && (
          <p>
            <span className="font-medium">First Practice:</span>{' '}
            {formatDateTimeNordic(race.FirstPractice.date, race.FirstPractice.time)}
          </p>
        )}
        {race.SecondPractice && (
          <p>
            <span className="font-medium">Second Practice:</span>{' '}
            {formatDateTimeNordic(race.SecondPractice.date, race.SecondPractice.time)}
          </p>
        )}
        {race.ThirdPractice && (
          <p>
            <span className="font-medium">Third Practice:</span>{' '}
            {formatDateTimeNordic(race.ThirdPractice.date, race.ThirdPractice.time)}
          </p>
        )}
        {race.Qualifying && (
          <p>
            <span className="font-medium">Qualifying:</span>{' '}
            {formatDateTimeNordic(race.Qualifying.date, race.Qualifying.time)}
          </p>
        )}
        {race.Sprint && (
          <p>
            <span className="font-medium">Sprint:</span>{' '}
            {formatDateTimeNordic(race.Sprint.date, race.Sprint.time)}
          </p>
        )}
        <p>
          <span className="font-medium">Race:</span>{' '}
          {formatDateTimeNordic(race.date, race.time)}
        </p>
      </div>
    </div>
  );
};

export default RaceWeekendSchedule;
