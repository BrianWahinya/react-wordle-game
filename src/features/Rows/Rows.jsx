import { useEffect, useRef } from "react";
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

const Rows = ({ target }) => {
  const { words, clearList } = useRowCtx();

  const options = target.length + 1;

  const virtualKybRef = useRef();

  const click = (e) => {
    if (virtualKybRef.current) {
      virtualKybRef.current.onVirtualKeyClick(e);
    }
  };

  useEffect(() => {
    clearList();
  }, [target]);

  return (
    <>
      {words.map((word) => (
        <Row
          key={genRandomId()}
          text={word}
          target={target}
          type="rowInactive"
        />
      ))}

      {words?.length < options && (
        <ActiveRow target={target} ref={virtualKybRef} />
      )}

      {fillEmptyRows(options - (words.length || 0) - 1).map((_) => (
        <Row key={genRandomId()} text={""} target={target} type="rowEmpty" />
      ))}

      <VirtualKeyboard click={click} />
    </>
  );
};
export default Rows;
