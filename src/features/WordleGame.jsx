import Rows from "./Rows/Rows";
import { RowCtxProvider } from "../context/RowContext.jsx";
import { useWordle } from "../hooks";
import Levels from "./Levels/Levels.jsx";
import ScoreSheet from "./ScoreSheet/ScoreSheet.jsx";

const WordleGame = () => {
  const { isFetching, isPending, target, fetchData } = useWordle();

  return (
    <>
      <div>
        <Levels />
      </div>
      <div>
        <RowCtxProvider>
          {!isFetching && !isPending && target ? <Rows /> : <></>}
        </RowCtxProvider>
      </div>
      <div>
        <button id="reload" onClick={fetchData}>
          Next
        </button>
        <ScoreSheet />
      </div>
    </>
  );
};
export default WordleGame;
