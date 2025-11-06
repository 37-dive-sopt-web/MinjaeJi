import * as styles from "./Card.css.js";

export default function Card({ card, isFlipped, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(card)}>
      <div className={`${styles.cardInner} ${isFlipped ? "flipped" : ""}`}>
        <div className={styles.front}>{card.value}</div>
        <div className={styles.back}>?</div>
      </div>
    </div>
  );
}
