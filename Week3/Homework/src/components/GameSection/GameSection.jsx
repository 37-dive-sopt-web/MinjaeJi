import * as styles from "./GameSection.css";
import GameBoard from "./GameBoard/GameBoard";

export default function GameSection() {
  return (
    <main className={styles.main}>
      <GameBoard />
      <>게임 진행 상황 올 자리</>
    </main>
  );
}
