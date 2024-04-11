import { useRef } from "react";
import { VirtualKeyboard } from "../../components";
import { useRowCtx } from "../../context/RowContext";
import { genRandomId } from "../../helpers/utils";
import ActiveRow from "./ActiveRow/ActiveRow";
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
  const options = target.length + 1;
  const { words } = useRowCtx();

  const virtualKybRef = useRef();

  const click = (e) => {
    if (virtualKybRef.current) {
      virtualKybRef.current.onVirtualKeyClick(e);
    }
  };

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
