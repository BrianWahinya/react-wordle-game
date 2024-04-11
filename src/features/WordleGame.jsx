import Rows from "./Rows/Rows";
import { RowCtxProvider } from "../context/RowContext.jsx";

const target = "try";
// const target = "mwalimu";

const WordleGame = () => {
  return (
    <div>
      <h2>Wordle Game</h2>
      {
        <RowCtxProvider>
          <Rows target={target} />
        </RowCtxProvider>
      }
    </div>
  );
};
export default WordleGame;
