import * as styles from "./GameStatus.css";

export default function GameStatus({
  level,
  setLevel,
  flipped,
  matched,
  totalCards,
  timeLeft,
}) {
  const totalPairs = totalCards / 2;
  const matchedPairs = matched.length / 2;
  const remainingPairs = totalPairs - matchedPairs;

  return (
    <section className={styles.gameStatusSection}>
      <div>
        <label>
          난이도:{" "}
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          >
            <option value={1}>Level 1 (쉬움)</option>
            <option value={2}>Level 2 (보통)</option>
            <option value={3}>Level 3 (어려움)</option>
          </select>
        </label>
      </div>

      <div>
        <div>남은 시간: {timeLeft.toFixed(2)}초 </div>
        <div>성공한 짝: {matchedPairs}</div>
        <div>남은 짝: {remainingPairs}</div>
      </div>

      <p>
        {remainingPairs === 0
          ? "모든 카드를 맞췄어요!"
          : "카드를 모두 맞춰보세요!"}
      </p>

      <div>{flipped.length === 2 && <p>결과 확인 중...</p>}</div>

      <p>최근 히스토리</p>
    </section>
  );
}
