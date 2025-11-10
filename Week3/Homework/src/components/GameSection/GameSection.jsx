import * as styles from "./game-section.css";
import GameBoard from "./GameBoard/GameBoard";
import GameStatus from "./GameStatus/GameStatus";
import { useEffect, useState } from "react";
import { buildDeck } from "../../utils/randomDeck";
import { useGameTimer } from "../../hooks/useGameTimer";

import GameResultModal from "../GameResultModal/GameResultModal";

const TIME_LIMITS = {
  1: 45,
  2: 60,
  3: 100,
};

export default function GameSection() {
  const [deck, setDeck] = useState([]);
  const [level, setLevel] = useState(1);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("카드를 눌러 게임을 시작하세요!");

  const { timeLeft, startTimer, stopTimer, resetTimer } = useGameTimer(
    TIME_LIMITS[level],
    () => {
      setMessage("시간 초과! 게임 종료!");
    }
  );

  const isLocked = flipped.length === 2;
  const isGameWon = matched.length > 0 && matched.length === deck.length;
  const isTimeOver = timeLeft === 0;
  const isGameOver = isTimeOver || isGameWon;

  useEffect(() => {
    handleResetGame();
  }, [level]);

  const handleResetGame = () => {
    setHasStarted(false);
    stopTimer();
    resetTimer(TIME_LIMITS[level]);
    setDeck(buildDeck(level));
    setFlipped([]);
    setMatched([]);
    setHistory([]);
    setMessage("카드를 눌러 게임을 시작하세요!");
  };

  const handleCardClick = (card) => {
    if (isGameOver) {
      setMessage("게임이 종료되었습니다!");
      return;
    }

    if (isLocked) {
      setMessage("잠시만 기다려 주세요.");
      return;
    }

    if (flipped.includes(card.id)) {
      setMessage("이미 선택한 카드예요.");
      return;
    }

    if (matched.includes(card.id)) {
      setMessage("이미 매치된 카드예요.");
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
      startTimer();
      setMessage("게임이 시작됐어요!");
    }

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map((id) =>
        deck.find((c) => c.id === id)
      );
      const isMatch = first.value === second.value;

      setHistory((prev) => [
        { pair: [first.value, second.value], success: isMatch },
        ...prev,
      ]);

      if (isMatch) {
        setMessage("성공!");
        setTimeout(() => {
          setMatched((prev) => [...prev, first.id, second.id]);
          setFlipped([]);
        }, 600);
      } else {
        setMessage("실패 ㅠ.ㅠ");
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  // 게임 승리 시 처리
  useEffect(() => {
    if (isGameWon) {
      stopTimer();
      setMessage("모든 카드를 맞췄어요!");

      // 클리어 기록 저장
      const clearTime = (TIME_LIMITS[level] - timeLeft).toFixed(2);
      const record = {
        time: Number(clearTime),
        level,
        date: new Date().toLocaleString(),
      };

      const existingRecords =
        JSON.parse(localStorage.getItem("gameRecords")) || [];

      const updatedRecords = [...existingRecords, record].sort((a, b) => {
        // 레벨 내림차순 정렬 (높은 레벨이 위로)
        if (a.level !== b.level) {
          return b.level - a.level;
        }
        // 같은 레벨이면 클리어 시간 오름차순 (빠른 순)
        return a.time - b.time;
      });

      localStorage.setItem("gameRecords", JSON.stringify(updatedRecords));
    }
  }, [isGameWon]);

  return (
    <main className={styles.main}>
      <GameBoard
        level={level}
        deck={deck}
        flipped={flipped}
        matched={matched}
        onResetClick={handleResetGame}
        onCardClick={handleCardClick}
      />
      <GameStatus
        level={level}
        setLevel={setLevel}
        flipped={flipped}
        matched={matched}
        totalCards={deck.length}
        timeLeft={timeLeft}
        message={message}
        history={history}
      />
      {isGameWon && (
        <GameResultModal
          mode="success"
          level={level}
          clearTime={TIME_LIMITS[level] - timeLeft}
          onRestart={handleResetGame}
        />
      )}

      {isTimeOver && !isGameWon && (
        <GameResultModal mode="fail" onRestart={handleResetGame} />
      )}
    </main>
  );
}
