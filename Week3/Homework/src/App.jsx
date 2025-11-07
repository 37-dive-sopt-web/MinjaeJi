import { useState } from "react";
import * as styles from "./App.css.js";
import Header from "./components/Header/Header";
import GameSection from "./components/GameSection/GameSection.jsx";
import RankingSection from "./components/RankingSection/RankingSection.jsx";

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
