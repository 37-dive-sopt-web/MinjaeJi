import * as styles from "./game-section.css";
import { useMainGameLogic } from "../../hooks/useMainGameLogic";
import GameBoard from "./GameBoard/GameBoard";
import GameStatus from "./GameStatus/GameStatus";
import GameResultModal from "../../components/GameResultModal/GameResultModal";

export default function GameSection() {
  const {
    gameLevel,
    cardDeck,
    flippedCards,
    matchedCards,
    flipHistory,
    timeLeft,
    guideMessage,
    isGameWon,
    isTimeOver,
    setGameLevel,
    handleResetGame,
    handleCardClick,
    timeLimit,
  } = useMainGameLogic();

  return (
    <main className={styles.main}>
      <GameBoard
        gameLevel={gameLevel}
        cardDeck={cardDeck}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onResetClick={handleResetGame}
        onCardClick={handleCardClick}
      />
      <GameStatus
        gameLevel={gameLevel}
        setGameLevel={setGameLevel}
        matchedCards={matchedCards}
        totalCards={cardDeck.length}
        timeLeft={timeLeft}
        guideMessage={guideMessage}
        flipHistory={flipHistory}
      />
      {isGameWon && (
        <GameResultModal
          mode="success"
          gameLevel={gameLevel}
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
