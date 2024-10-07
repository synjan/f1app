import React, { useState, useEffect } from 'react';

const RaceCountdown = ({ nextRace }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    if (!nextRace) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const difference = +new Date(`${nextRace.date}T${nextRace.time}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="text-2xl font-bold mx-2">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Next Race: {nextRace?.raceName}</h2>
      <div className="flex justify-center items-center">
        {timerComponents.length ? timerComponents : <span>Race is underway!</span>}
      </div>
    </div>
  );
};

export default RaceCountdown;
