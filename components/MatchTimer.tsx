
import React, { useState, useEffect } from 'react';

const MatchTimer: React.FC = () => {
  // Add injury time of 1 to 7 minutes for simulation
  const [injuryTimeSeconds] = useState(Math.floor(Math.random() * 7 + 1) * 60);

  // Constants for time calculations in seconds
  const FIRST_HALF_SECONDS = 45 * 60;
  const HALF_TIME_SECONDS = 15 * 60;
  const SECOND_HALF_SECONDS = 45 * 60;
  
  const REGULAR_GAME_TIME_SECONDS = FIRST_HALF_SECONDS + SECOND_HALF_SECONDS;
  const TOTAL_GAME_TIME_SECONDS = REGULAR_GAME_TIME_SECONDS + injuryTimeSeconds;

  // The total duration of the event on the real-world timeline, including the half-time break
  const TOTAL_ELAPSED_DURATION = FIRST_HALF_SECONDS + HALF_TIME_SECONDS + SECOND_HALF_SECONDS + injuryTimeSeconds;

  // Start the game at a random point up to 100 minutes elapsed to simulate a live game in progress.
  const [startTime] = useState(Date.now() - Math.random() * 100 * 60 * 1000);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      // Cap elapsed time at the very end of the match to stop the timer
      const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedSeconds(Math.min(currentElapsed, TOTAL_ELAPSED_DURATION));
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update

    return () => clearInterval(interval);
  }, [startTime, TOTAL_ELAPSED_DURATION]);
  
  const getPhaseAndGameTime = () => {
    // First Half
    if (elapsedSeconds < FIRST_HALF_SECONDS) {
      return { phase: '1ST HALF', gameTime: elapsedSeconds };
    }

    // Half Time
    const halfTimeEndElapsed = FIRST_HALF_SECONDS + HALF_TIME_SECONDS;
    if (elapsedSeconds < halfTimeEndElapsed) {
      return { phase: 'HALF TIME', gameTime: halfTimeEndElapsed - elapsedSeconds }; // Countdown
    }

    // Second Half (including injury time)
    if (elapsedSeconds <= TOTAL_ELAPSED_DURATION) {
      // Calculate game time by adding the time passed in second half to 45 mins
      const secondHalfTimePassed = elapsedSeconds - halfTimeEndElapsed;
      return { phase: '2ND HALF', gameTime: FIRST_HALF_SECONDS + secondHalfTimePassed };
    }

    // Full Time
    return { phase: 'FULL TIME', gameTime: TOTAL_GAME_TIME_SECONDS };
  };

  const { phase, gameTime } = getPhaseAndGameTime();

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-xs font-semibold text-gray-400 tracking-widest">{phase}</div>
      <div className="text-3xl font-mono font-bold text-teal-400 tracking-wider">
        {formatTime(Math.floor(gameTime))}
      </div>
    </div>
  );
};

export default MatchTimer;
