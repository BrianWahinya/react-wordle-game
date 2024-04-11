import icon_wordle from "./assets/icon_wordle.svg";
import { GameCtxProvider } from "./context/GameContext";
import { WordleGame } from "./features";
// import './App.css'

function App() {
  return (
    <>
      <nav>Nav</nav>
      <main>
        <h2>Wordle Game</h2>
        <GameCtxProvider>
          <WordleGame />
        </GameCtxProvider>
      </main>
      <p>Footer</p>
    </>
  );
}

export default App;
