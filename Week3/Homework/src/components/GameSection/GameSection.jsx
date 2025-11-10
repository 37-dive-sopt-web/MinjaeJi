import * as styles from "./game-section.css";
import GameBoard from "./GameBoard/GameBoard";
import GameStatus from "./GameStatus/GameStatus";
import GameResultModal from "../GameResultModal/GameResultModal";
import { useMainGameLogic } from "../../hooks/useMainGameLogic";

export default function GameSection() {
  const {
    level,
    cardDeck,
    flippedCards,
    matchedCards,
    flipHistory,
    timeLeft,
    guideMessage,
    isGameWon,
    isTimeOver,
    setLevel,
    handleResetGame,
    handleCardClick,
    timeLimit,
  } = useMainGameLogic();

  return (
    <main className={styles.main}>
      <GameBoard
        level={level}
        cardDeck={cardDeck}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onResetClick={handleResetGame}
        onCardClick={handleCardClick}
      />
      <GameStatus
        level={level}
        setLevel={setLevel}
        matchedCards={matchedCards}
        totalCards={cardDeck.length}
        timeLeft={timeLeft}
        guideMessage={guideMessage}
        flipHistory={flipHistory}
      />
      {isGameWon && (
        <GameResultModal
          mode="success"
          level={level}
          clearTime={timeLimit - timeLeft}
          onRestart={handleResetGame}
        />
      )}

      {isTimeOver && !isGameWon && (
        <GameResultModal mode="fail" onRestart={handleResetGame} />
      )}
    </main>
  );
}
