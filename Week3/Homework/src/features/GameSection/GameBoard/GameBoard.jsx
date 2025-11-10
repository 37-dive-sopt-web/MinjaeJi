import * as styles from "./game-board.css.js";
import Card from "../../../components/Card/Card.jsx";

export default function GameBoard({
  gameLevel,
  cardDeck,
  flippedCards,
  matchedCards,
  onResetClick,
  onCardClick,
}) {
  const columns = gameLevel === 1 ? 4 : gameLevel === 2 ? 6 : 6;
  return (
    <section className={styles.gameBoardSection}>
      <div className={styles.gameBoardHeader}>
        <h2>게임 보드</h2>
        <button className={styles.gameBoardButton} onClick={onResetClick}>
          게임 리셋
        </button>
      </div>

      <div
        className={styles.cardContainer}
        style={{
          gridTemplateColumns: `repeat(${columns}, 100px)`,
        }}
      >
        {cardDeck.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
            }
            isMatched={matchedCards.includes(card.id)}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}
