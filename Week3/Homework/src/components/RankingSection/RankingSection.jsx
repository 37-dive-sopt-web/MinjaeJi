import * as styles from "./RankingSection.css";
import { useEffect, useState } from "react";

export default function RankingSection() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("gameRecords")) || [];
    setRecords(savedRecords);
  }, []);

  const handleClearRecords = () => {
    localStorage.removeItem("gameRecords");
    setRecords([]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.gameBoardHeader}>
        <h2>랭킹 보드</h2>
        <button className={styles.gameBoardButton} onClick={handleClearRecords}>
          기록 초기화
        </button>
      </div>
      <div>
        {records.length === 0 ? (
          <p className={styles.emptyMessage}>아직 클리어 기록이 없습니다.</p>
        ) : (
          <table className={styles.rankingTable}>
            <thead>
              <tr>
                <th className={styles.th}>순위</th>
                <th className={styles.th}>레벨</th>
                <th className={styles.th}>클리어 시간 (초)</th>
                <th className={styles.th}>날짜</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{i + 1}</td>
                  <td className={styles.td}>Lv.{r.level}</td>
                  <td className={styles.td}>{r.time}</td>
                  <td className={styles.td}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
