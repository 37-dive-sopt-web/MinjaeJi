import { useState, useEffect } from "react";
import * as styles from "./GameBoard.css.js";
import Card from "./Card.jsx";
import { buildDeck } from "../../../utils/random-deck.js";

export default function GameBoard() {
  const [deck, setDeck] = useState([]); // nxn 덱
  const [flipped, setFlipped] = useState([]); // 뒤집어진 카드
  const [matched, setMatched] = useState([]); // 짝 맞춰진 카드들
  const [isLocked, setIsLocked] = useState(false); // 동시에 뒤집을 수 있는 카드는 2개

  useEffect(() => {
    resetGame();
  }, []); // 버튼 클릭 시, 페이지 로드 시 리셋

  const resetGame = () => {
    setDeck(buildDeck(1)); // 기본 4x4
    setFlipped([]);
    setMatched([]);
    setIsLocked(false);
  };

  const handleCardClick = (card) => {
    if (isLocked) return; // isLocked true? 이미 두 개 뒤집어져 있음 (안 맞혀 있는 두 개)
    if (flipped.includes(card.id) || matched.includes(card.id)) return; // 이미 뒤집어진 카드이거나 매치된 거면 return

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
      alert("모든 카드를 맞췄어요!");
    }
  }, [matched]);

  return (
    <section className={styles.gameBoardSection}>
      <div className={styles.gameBoardHeader}>
        <h2>게임 보드</h2>
        <button className={styles.gameBoardButton} onClick={resetGame}>
          게임 리셋
        </button>
      </div>

      <div className={styles.cardContainer}>
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  );
}
