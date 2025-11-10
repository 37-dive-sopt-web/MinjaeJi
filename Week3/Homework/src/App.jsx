import { useState } from "react";
import * as styles from "./App.css.js";
import Header from "./features/Header/Header.jsx";
import GameSection from "./features/GameSection/GameSection.jsx";
import RankingSection from "./features/RankingSection/RankingSection.jsx";

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
