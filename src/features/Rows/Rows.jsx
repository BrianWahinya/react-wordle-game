import { useLayoutEffect, useRef } from "react";
import { VirtualKeyboard } from "../../components";
import { useRowCtx } from "../../context/RowContext";
import { genRandomId } from "../../helpers/utils";
import { useGameCtx } from "../../context/GameContext";
import ActiveRow from "./ActiveRow";
import Row from "./Row";

import "./css/rows.css";

const fillEmptyRows = (amount) => {
  const emptyRows = [];
  for (let i = 0; i < amount; i++) {
    emptyRows.push("");
  }
  return emptyRows;
};

const Rows = () => {
  const { words, clearList } = useRowCtx();
  const { target, gameStatus } = useGameCtx();

  const options = target.length + 1;

  const virtualKybRef = useRef();

  const click = (e) => {
    if (virtualKybRef.current) {
      virtualKybRef.current.onVirtualKeyClick(e);
    }
  };

  useLayoutEffect(() => {
    clearList();
  }, [target]);

  const emptyRowsAmount =
    options - words.length - (gameStatus === "ongoing" ? 1 : 0);

  return (
    <>
      {words.map((word) => (
        <Row key={genRandomId()} text={word} type="rowInactive" />
      ))}

      {words?.length < options && gameStatus === "ongoing" && (
        <ActiveRow ref={virtualKybRef} />
      )}

      {fillEmptyRows(emptyRowsAmount).map((_) => (
        <Row key={genRandomId()} text={""} type="rowEmpty" />
      ))}

      <VirtualKeyboard click={click} />
    </>
  );
};
export default Rows;
