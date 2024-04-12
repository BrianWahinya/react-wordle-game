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
  const { target } = useGameCtx();

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

  return (
    <>
      {words.map((word) => (
        <Row key={genRandomId()} text={word} type="rowInactive" />
      ))}

      {words?.length < options && <ActiveRow ref={virtualKybRef} />}

      {fillEmptyRows(options - (words.length || 0) - 1).map((_) => (
        <Row key={genRandomId()} text={""} type="rowEmpty" />
      ))}

      <VirtualKeyboard click={click} />
    </>
  );
};
export default Rows;
