import * as styles from "./GameBoard.css.js";
import Card from "./Card.jsx";

export default function GameBoard({
  level,
  deck,
  flipped,
  matched,
  onResetClick,
  onCardClick,
}) {
  const columns = level === 1 ? 4 : level === 2 ? 6 : 6;
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
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}
