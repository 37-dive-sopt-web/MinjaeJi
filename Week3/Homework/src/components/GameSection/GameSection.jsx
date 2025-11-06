import * as styles from "./GameSection.css";
import GameBoard from "./GameBoard/GameBoard";
import GameStatus from "./GameStatus/GameStatus";
import { useEffect, useRef, useState } from "react";
import { buildDeck } from "../../utils/random-deck";

const TIME_LIMITS = {
  1: 45,
  2: 60,
  3: 100,
};

export default function GameSection() {
  const [deck, setDeck] = useState([]); // nxn 덱
  const [level, setLevel] = useState(1); // 현재 게임 레벨
  // 위 두 개 합치기 가능?

  const [flipped, setFlipped] = useState([]); // 뒤집어진 카드들
  const [matched, setMatched] = useState([]); // 짝 맞춰진 카드들
  const [isLocked, setIsLocked] = useState(false); // 동시에 뒤집을 수 있는 카드는 2개
  const [timeLeft, setTimeLeft] = useState(TIME_LIMITS[level]); // 타이머
  const [isGameOver, setIsGameOver] = useState(false); // 게임 종료
  const [hasStarted, setHasStarted] = useState(false); // 게임 시작 시 타이머 가동 -> 이거 불필요한 상태인가?

  const [message, setMessage] = useState("카드를 눌러 게임을 시작하세요!");
  const [history, setHistory] = useState([]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    handleResetGame();
  }, [level]); // level 바뀌거나 리셋 시 새 덱 생성

  const handleResetGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDeck(buildDeck(level)); // 기본 4x4
    setFlipped([]);
    setMatched([]);
    setIsLocked(false);
    setIsGameOver(false);
    setHasStarted(false);
    setTimeLeft(TIME_LIMITS[level]);
    setMessage("카드를 눌러 게임을 시작하세요!");
    setHistory([]);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = TIME_LIMITS[level] - elapsed;

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        setIsGameOver(true);
        alert("시간 초과! 게임 종료!");
        return;
      }

      setTimeLeft(remaining);
    }, 50);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleCardClick = (card) => {
    if (isLocked || isGameOver) {
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
      setIsLocked(true);
      const [first, second] = newFlipped.map((id) =>
        deck.find((c) => c.id === id)
      );

      if (first.value === second.value) {
        setMatched((prev) => [...prev, first.id, second.id]);
        setMessage("성공!");

        setHistory((prev) => [
          { pair: [first.value, second.value], success: true },
          ...prev,
        ]);
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 600);
      } else {
        setMessage("실패 ㅠ.ㅠ");
        setHistory((prev) => [
          { pair: [first.value, second.value], success: false },
          ...prev,
        ]);
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 700);
      }
    }
  };

  // 게임 종료 체크
  useEffect(() => {
    if (matched.length && matched.length === deck.length) {
      clearInterval(timerRef.current);
      setIsGameOver(true);
      alert("모든 카드를 맞췄어요!");
    }
  }, [matched]);

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
