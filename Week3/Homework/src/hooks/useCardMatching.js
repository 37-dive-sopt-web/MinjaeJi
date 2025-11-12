import { useState, useCallback } from "react";

export const useCardMatching = (cardDeck) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flipHistory, setFlipHistory] = useState([]);

  const isLocked = flippedCards.length === 2;
  const isGameWon =
    matchedCards.length > 0 && matchedCards.length === cardDeck.length;

  const handleFlipCards = useCallback(
    (cardId) => {
      if (
        isLocked ||
        flippedCards.includes(cardId) ||
        matchedCards.includes(cardId)
      ) {
        return false;
      }

      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards.map((id) =>
          cardDeck.find((c) => c.id === id)
        );
        const isMatch = firstCard.value === secondCard.value;

        setFlipHistory((prev) => [
          { pair: [firstCard.value, secondCard.value], success: isMatch },
          ...prev,
        ]);

        if (isMatch) {
          setTimeout(() => {
            setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
            setFlippedCards([]);
          }, 600);
          return "match";
        } else {
          setTimeout(() => setFlippedCards([]), 700);
          return "mismatch";
        }
      }

      return true;
    },
    [flippedCards, matchedCards, cardDeck, isLocked]
  );

  const resetMatching = useCallback(() => {
    setFlippedCards([]);
    setMatchedCards([]);
    setFlipHistory([]);
  }, []);

  return {
    flippedCards,
    matchedCards,
    flipHistory,
    isLocked,
    isGameWon,
    handleFlipCards,
    resetMatching,
  };
};
