import * as styles from "./Header.css.js";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className={styles.headerContainer}>
      <h1>숫자 카드 짝 맞추기</h1>
      <div className={styles.buttonContainer}>
        <button
          className={activeTab === "game" ? styles.buttonActive : styles.button}
          onClick={() => setActiveTab("game")}
        >
          게임
        </button>
        <button
          className={
            activeTab === "ranking" ? styles.buttonActive : styles.button
          }
          onClick={() => setActiveTab("ranking")}
        >
          랭킹
        </button>
      </div>
    </header>
  );
}
