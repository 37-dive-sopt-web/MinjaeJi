import { useState } from "react";
import * as styles from "./App.css.js";
import Header from "./components/Header/Header";
import GameSection from "./components/GameSection/GameSection.jsx";
import RankingSection from "./components/RankingSection/RankingSection.jsx";

// 게임, 랭킹을 네비게이션으로 처리하는 게 아니라, 컴포넌트만 바뀌게 상태 기반 렌더링으로 처리
function App() {
  const [activeTab, setActiveTab] = useState("game");
  return (
    <div className={styles.appContainer}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "game" && <GameSection />}
      {activeTab === "ranking" && <RankingSection />}
    </div>
  );
}

export default App;
