import icon_wordle from "./assets/icon_wordle.svg";
import { GameCtxProvider } from "./context/GameContext";
import { WordleGame } from "./features";
import "./App.css";
import { Footer } from "./components";

function App() {
  return (
    <>
      <code>
        Coding & design stage: please be patient{" "}
        <span style={{ fontSize: "20px" }}>&#128521;</span>
      </code>
      <main>
        <h2>Wordle Game</h2>
        <GameCtxProvider>
          <WordleGame />
        </GameCtxProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
