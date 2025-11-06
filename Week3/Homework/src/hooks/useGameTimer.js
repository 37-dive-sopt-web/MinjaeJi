import { useEffect, useRef, useState } from "react";

export function useGameTimer(limit, onTimeout) {
  const [timeLeft, setTimeLeft] = useState(limit);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = limit - elapsed;
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        onTimeout?.();
      } else setTimeLeft(remaining);
    }, 50);
  };

  const stopTimer = () => clearInterval(timerRef.current);
  const resetTimer = () => setTimeLeft(limit);

  useEffect(() => stop, []);

  return { timeLeft, startTimer, stopTimer, resetTimer };
}
