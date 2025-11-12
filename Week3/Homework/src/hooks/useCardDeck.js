import { useState, useEffect } from "react";
import { buildDeck } from "../utils/randomDeck";

export const useCardDeck = (gameLevel) => {
  const [cardDeck, setCardDeck] = useState([]);

  useEffect(() => {
    setCardDeck(buildDeck(gameLevel));
  }, [gameLevel]);

  const resetCardDeck = () => {
    setCardDeck(buildDeck(gameLevel));
  };

  return { cardDeck, resetCardDeck };
};
