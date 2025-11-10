import * as styles from "./game-status.css";
import { LevelSelect } from "./LevelSelect";
export default function GameStatus({
  gameLevel,
  setLevel,
  matchedCards,
  totalCards,
  timeLeft,
  guideMessage,
  flipHistory,
}) {
  const totalPairs = totalCards / 2;
  const matchedPairs = matchedCards.length / 2;
  const remainingPairs = totalPairs - matchedPairs;

  const pairStats = [
    { label: "남은 시간", value: timeLeft.toFixed(2) },
    { label: "성공한 짝", value: matchedPairs },
    { label: "남은 짝", value: remainingPairs },
  ];

  return (
    <section className={styles.gameStatusSection}>
      <LevelSelect value={gameLevel} onChange={setLevel} />

      <div className={styles.pairStat}>
        {pairStats.map((item) => (
          <div key={item.label} className={styles.pairContainer}>
            <span className={styles.title}>{item.label}</span>
            <span className={styles.content}>{item.value}</span>
          </div>
        ))}
      </div>

      <p className={styles.infoTitle}>안내 메시지</p>
      <div className={styles.infoContent}>{guideMessage}</div>

      <p className={styles.infoTitle}>최근 히스토리</p>
      <div className={styles.historyContainer}>
        {flipHistory.length === 0 ? (
          <div className={styles.infoContent}>아직 뒤집은 카드가 없어요.</div>
        ) : (
          flipHistory.map((h, i) => (
            <div key={i} className={styles.infoContent}>
              <div className={styles.historyPair}>
                ({h.pair[0]}, {h.pair[1]})
              </div>
              <span
                className={`${styles.historyResult} ${
                  h.success ? "success" : "fail"
                }`}
              >
                {h.success ? "성공" : "실패"}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
