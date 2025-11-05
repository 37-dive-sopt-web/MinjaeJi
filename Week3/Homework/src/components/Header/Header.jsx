import * as styles from "./Header.css.js";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>숫자 카드 짝 맞추기</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button}>게임</button>
        <button className={styles.button}>랭킹</button>
      </div>
    </header>
  );
}
