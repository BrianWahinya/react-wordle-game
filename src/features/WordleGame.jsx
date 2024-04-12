import Rows from "./Rows/Rows";
import { RowCtxProvider } from "../context/RowContext.jsx";
import { useWordle } from "../hooks";

const WordleGame = () => {
  const { isFetching, isPending, target, fetchData } = useWordle();

  return (
    <>
      <div>
        <RowCtxProvider>
          {!isFetching && !isPending && target ? <Rows /> : <></>}
        </RowCtxProvider>
      </div>
      <div>
        <button id="reload" onClick={fetchData}>
          Reload
        </button>
      </div>
    </>
  );
};
export default WordleGame;
