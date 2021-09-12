import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const gamePaused = useSelector((state) => state.game.gamePaused);

  useEffect(() => {
    let interval = null;
    if (!gamePaused) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (gamePaused && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gamePaused, seconds]);

  return <div className="button-green">{seconds} seconds</div>;
};

export default Timer;
