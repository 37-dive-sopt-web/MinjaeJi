import * as styles from "./GameSection.css";
import GameBoard from "./GameBoard/GameBoard";
import GameStatus from "./GameStatus/GameStatus";
import { useEffect, useState } from "react";
import { buildDeck } from "../../utils/random-deck";
import { useGameTimer } from "../../hooks/useGameTimer";

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
      alert("시간 초과! 게임 종료!");
    }
  );

  const isLocked = flipped.length === 2;
  const isGameWon = matched.length > 0 && matched.length === deck.length;
  const isGameOver = timeLeft === 0 || isGameWon;

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
    // 게임 종료 시 클릭 막기
    if (isGameOver) {
      setMessage("게임이 종료되었습니다!");
      return;
    }

    // 이미 두 장 오픈된 상태면 클릭 불가
    if (isLocked) {
      setMessage("잠시만 기다려 주세요.");
      return;
    }

    // 이미 선택한 카드 클릭 시
    if (flipped.includes(card.id)) {
      setMessage("이미 선택한 카드예요.");
      return;
    }

    // 이미 매칭된 카드 클릭 시
    if (matched.includes(card.id)) {
      setMessage("이미 매치된 카드예요.");
      return;
    }

    //첫 클릭일 때만 타이머 시작
    if (!hasStarted) {
      setHasStarted(true);
      startTimer();
      setMessage("게임이 시작됐어요!");
    }

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    // 두 번째 카드 선택 시 매칭 로직
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
      alert("모든 카드를 맞췄어요!");

      // 클리어 기록 저장
      const clearTime = (TIME_LIMITS[level] - timeLeft).toFixed(2); // 클리어 시간 (소수점 둘째 자리)
      const record = {
        time: clearTime,
        level,
        date: new Date().toLocaleString(), // 현재 시각
      };

      const existingRecords =
        JSON.parse(localStorage.getItem("gameRecords")) || [];

      const updatedRecords = [...existingRecords, record].sort(
        (a, b) => a.time - b.time // 빠른 시간 순 정렬
      );

      localStorage.setItem("gameRecords", JSON.stringify(updatedRecords));
    }
  }, [isGameWon, stopTimer]);

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
    </main>
  );
}
