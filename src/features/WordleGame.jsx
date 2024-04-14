import Rows from "./Rows/Rows";
import { RowCtxProvider } from "../context/RowContext.jsx";
import { useWordle } from "../hooks";
import Levels from "./Levels/Levels.jsx";
import ScoreSheet from "./ScoreSheet/ScoreSheet.jsx";

const WordleGame = () => {
  const { isFetching, isPending, target, gameStatus, fetchData } = useWordle();

  return (
    <>
      <div className="divLevels">
        <Levels />
      </div>
      <div className="divGame">
        <RowCtxProvider>
          {!isFetching && !isPending && target ? <Rows /> : <></>}
        </RowCtxProvider>
      </div>
      <div>
        {gameStatus !== "ongoing" && (
          <button className="btnNext" id="reload" onClick={fetchData}>
            Next
          </button>
        )}
        <ScoreSheet />
      </div>
    </>
  );
};
export default WordleGame;
