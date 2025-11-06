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
  const [flipped, setFlipped] = useState([]); // 뒤집어진 카드
  const [matched, setMatched] = useState([]); // 짝 맞춰진 카드들
  const [isLocked, setIsLocked] = useState(false); // 동시에 뒤집을 수 있는 카드는 2개
  const [timeLeft, setTimeLeft] = useState(TIME_LIMITS[level]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    handleResetGame();
  }, [level]); // level 바뀌거나 리셋 시 새 덱 생성

  const handleResetGame = () => {
    setDeck(buildDeck(level)); // 기본 4x4
    setFlipped([]);
    setMatched([]);
    setIsLocked(false);
    setIsGameOver(false);
    setHasStarted(false);
    setTimeLeft(TIME_LIMITS[level]);
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
    }, 50); // 20fps (부드럽고 가볍게)
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleCardClick = (card) => {
    if (isLocked || isGameOver) return; // isLocked true? 이미 두 개 뒤집어져 있음 (안 맞혀 있는 두 개)
    if (flipped.includes(card.id) || matched.includes(card.id)) return; // 이미 뒤집어진 카드이거나 매치된 거면 return

    if (!hasStarted) {
      setHasStarted(true);
      startTimer();
    }

    // 뒤집어진 카드들 기록
    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    // 뒤집어진 카드가 두 개라면, 값 비교
    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [first, second] = newFlipped.map(
        (id) => deck.find((c) => c.id === id) // deck에서 찾아서 first, second에 각각 할당
      );

      if (first.value === second.value) {
        setMatched((prev) => [...prev, first.id, second.id]);
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 600);
      } else {
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
      />
    </main>
  );
}
