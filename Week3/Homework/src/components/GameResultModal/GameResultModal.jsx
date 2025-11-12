import * as styles from "./game-result-modal.css";
import { useCountdownTimer } from "../../hooks/useCountdownTimer";
import ModalPortal from "../ModalPortal";
import { useEffect } from "react";

export default function GameResultModal({
  mode,
  gameLevel,
  clearTime,
  onRestart,
}) {
  const isSuccess = mode === "success";
  const countDown = useCountdownTimer(5, onRestart, isSuccess);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onRestart();
  };

  return (
    <ModalPortal>
      <div
        className={styles.overlay}
        onClick={!isSuccess ? handleOverlayClick : undefined}
      >
        <div className={styles.modal}>
          {isSuccess ? (
            <>
              <h2>축하합니다!🥳</h2>
              <p>
                <span className={styles.accent}>level {gameLevel}</span>을
                <span className={styles.accent}>{clearTime.toFixed(2)}</span>초
                만에 클리어 했어요 🔥
              </p>
              <p>
                <span className={styles.accent}>{countDown}</span>초 후 새 게임
                시작!
              </p>
            </>
          ) : (
            <>
              <h2>아쉬워요 ㅠㅠ... 😢</h2>
              <p>다음에는 더 아자잣!! 🤩</p>
            </>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}
