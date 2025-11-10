import { useState, useCallback, useEffect } from "react";
import { useCardDeck } from "./useCardDeck";
import { useCardMatching } from "./useCardMatching";
import { useGameTimer } from "./useGameTimer";
import { useGameRecords } from "./useCardRecords";

const TIME_LIMITS = {
  1: 45,
  2: 60,
  3: 100,
};

export const useMainGameLogic = () => {
  const [gameLevel, setGameLevel] = useState(1);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [guideMessage, setGuideMessage] =
    useState("카드를 눌러 게임을 시작하세요!");

  const { cardDeck, resetCardDeck } = useCardDeck(gameLevel);

  const {
    flippedCards,
    matchedCards,
    flipHistory,
    isLocked,
    isGameWon,
    handleFlipCards,
    resetMatching,
  } = useCardMatching(cardDeck);

  const { timeLeft, startTimer, stopTimer, resetTimer } = useGameTimer(
    TIME_LIMITS[gameLevel],
    () => {
      setGuideMessage("시간 초과! 게임 종료!");
    }
  );

  const isTimeOver = timeLeft === 0;
  const isGameOver = isTimeOver || isGameWon;

  // 게임 기록 저장
  useGameRecords(isGameWon, gameLevel, timeLeft, TIME_LIMITS[gameLevel]);

  // 게임 승리 시 메시지 처리
  useEffect(() => {
    if (isGameWon) {
      stopTimer();
      setGuideMessage("모든 카드를 맞췄어요!");
    }
  }, [isGameWon, stopTimer]);

  // 레벨 변경 시 게임 리셋
  useEffect(() => {
    handleResetGame();
  }, [gameLevel]);

  const handleResetGame = useCallback(() => {
    setIsGameStarted(false);
    stopTimer();
    resetTimer(TIME_LIMITS[gameLevel]);
    resetCardDeck();
    resetMatching();
    setGuideMessage("카드를 눌러 게임을 시작하세요!");
  }, [gameLevel, stopTimer, resetTimer, resetCardDeck, resetMatching]);

  const handleCardClick = useCallback(
    (card) => {
      if (isGameOver) {
        setGuideMessage("게임이 종료되었습니다!");
        return;
      }

      if (isLocked) {
        setGuideMessage("잠시만 기다려 주세요.");
        return;
      }

      if (flippedCards.includes(card.id)) {
        setGuideMessage("이미 선택한 카드예요.");
        return;
      }

      if (matchedCards.includes(card.id)) {
        setGuideMessage("이미 매치된 카드예요.");
        return;
      }

      if (!isGameStarted) {
        setIsGameStarted(true);
        startTimer();
        setGuideMessage("게임이 시작됐어요!");
      }

      const flipResult = handleFlipCards(card.id);

      if (flipResult === "match") {
        setGuideMessage("성공!");
      } else if (flipResult === "mismatch") {
        setGuideMessage("실패 ㅠ.ㅠ");
      }
    },
    [
      isGameOver,
      isLocked,
      flippedCards,
      matchedCards,
      isGameStarted,
      handleFlipCards,
      startTimer,
    ]
  );

  return {
    gameLevel,
    cardDeck,
    flippedCards,
    matchedCards,
    flipHistory,
    timeLeft,
    guideMessage,
    isGameWon,
    isTimeOver,
    isGameOver,

    setGameLevel,
    handleResetGame,
    handleCardClick,

    timeLimit: TIME_LIMITS[gameLevel],
  };
};
