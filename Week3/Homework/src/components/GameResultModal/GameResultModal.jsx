import ModalPortal from "../ModalPortal";
import * as styles from "./GameResultModal.css";
import { useEffect, useState } from "react";

export default function GameResultModal({ mode, level, clearTime, onRestart }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (mode === "fail") return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      onRestart();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [mode, onRestart]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onRestart();
    }
  };

  return (
    <ModalPortal>
      {mode === "success" ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>축하합니다!🥳</h2>
            <p>
              level {level}을 {clearTime.toFixed(2)}초 만에 클리어 했어요 🔥
            </p>
            <p>{countdown}초 후 새 게임 시작</p>
          </div>
        </div>
      ) : (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <h2>아쉬워요 ㅠㅠ... 😢</h2>
            <p>다음에는 더 아자잣!! 🤩</p>
          </div>
        </div>
      )}
    </ModalPortal>
  );
}
