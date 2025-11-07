import * as styles from "./RankingSection.css";
import { useEffect, useState } from "react";

export default function RankingSection() {
  const [gameRecords, setGameRecords] = useState([]);

  useEffect(() => {
    const savedGameRecords =
      JSON.parse(localStorage.getItem("gameRecords")) || [];
    setGameRecords(savedGameRecords);
  }, []);

  const handleClearGameRecords = () => {
    localStorage.removeItem("gameRecords");
    setGameRecords([]);
  };

  const renderRankingRow = (r, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>Level {r.level}</td>
      <td>{r.time}</td>
      <td>{r.date}</td>
    </tr>
  );

  return (
    <main className={styles.main}>
      <div className={styles.gameBoardHeader}>
        <h2>랭킹 보드</h2>
        <button
          className={styles.gameBoardButton}
          onClick={handleClearGameRecords}
        >
          기록 초기화
        </button>
      </div>

      {gameRecords.length === 0 ? (
        <p className={styles.noResultMessage}>아직 클리어 기록이 없습니다.</p>
      ) : (
        <table className={styles.rankingTable}>
          <thead>
            <tr>
              <th>순위</th>
              <th>레벨</th>
              <th>클리어 시간 (초)</th>
              <th>기록 시각</th>
            </tr>
          </thead>
          <tbody>{gameRecords.map(renderRankingRow)}</tbody>
        </table>
      )}
    </main>
  );
}
