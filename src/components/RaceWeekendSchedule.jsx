import React from 'react';
import { formatDateTimeNordic } from '../utils/dateUtils';

const RaceWeekendSchedule = ({ race }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {race.FirstPractice && (
        <div>
          <div className="font-medium">First Practice</div>
          <div className="text-muted-foreground">{formatDateTimeNordic(race.FirstPractice.date, race.FirstPractice.time)}</div>
        </div>
      )}
      {race.SecondPractice && (
        <div>
          <div className="font-medium">Second Practice</div>
          <div className="text-muted-foreground">{formatDateTimeNordic(race.SecondPractice.date, race.SecondPractice.time)}</div>
        </div>
      )}
      {race.ThirdPractice && (
        <div>
          <div className="font-medium">Third Practice</div>
          <div className="text-muted-foreground">{formatDateTimeNordic(race.ThirdPractice.date, race.ThirdPractice.time)}</div>
        </div>
      )}
      {race.Qualifying && (
        <div>
          <div className="font-medium">Qualifying</div>
          <div className="text-muted-foreground">{formatDateTimeNordic(race.Qualifying.date, race.Qualifying.time)}</div>
        </div>
      )}
      {race.Sprint && (
        <div>
          <div className="font-medium">Sprint</div>
          <div className="text-muted-foreground">{formatDateTimeNordic(race.Sprint.date, race.Sprint.time)}</div>
        </div>
      )}
      <div>
        <div className="font-medium">Main Race</div>
        <div className="text-muted-foreground">{formatDateTimeNordic(race.date, race.time)}</div>
      </div>
    </div>
  );
};

export default RaceWeekendSchedule;
