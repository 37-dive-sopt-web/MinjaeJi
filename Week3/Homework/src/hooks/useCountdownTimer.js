import { useEffect, useState } from "react";

export function useCountdownTimer(duration, onFinish, isActive = true) {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      onFinish?.();
    }, duration * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, isActive, onFinish]);

  return count;
}
