import * as styles from "./card.css.js";

export default function Card({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`${styles.card} ${isMatched ? styles.matched : ""}`}
      onClick={() => onClick(card)}
    >
      <div className={`${styles.cardInner} ${isFlipped ? "flipped" : ""}`}>
        <div className={styles.front}>{card.value}</div>
        <div className={styles.back}>?</div>
      </div>
    </div>
  );
}
