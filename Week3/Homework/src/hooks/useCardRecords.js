import { useEffect } from "react";

export const useGameRecords = (isGameWon, gameLevel, timeLeft, timeLimit) => {
  useEffect(() => {
    if (!isGameWon) return;

    const gameClearTime = (timeLimit - timeLeft).toFixed(2);
    const gameRecord = {
      time: Number(gameClearTime),
      gameLevel,
      date: new Date().toLocaleString(),
    };

    const existingGameRecords =
      JSON.parse(localStorage.getItem("gameRecords")) || [];

    const updatedGameRecords = [...existingGameRecords, gameRecord].sort(
      (a, b) => {
        if (a.level !== b.level) {
          return b.level - a.level;
        }
        return a.time - b.time;
      }
    );

    localStorage.setItem("gameRecords", JSON.stringify(updatedGameRecords));
  }, [isGameWon, gameLevel, timeLeft, timeLimit]);
};
