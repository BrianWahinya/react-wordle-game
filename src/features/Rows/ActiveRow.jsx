import { forwardRef, useImperativeHandle } from "react";
import { useActiveRow } from "../../hooks";
import Row from "./Row";

const ActiveRow = forwardRef((props, ref) => {
  const { text, onVirtualKeyClick } = useActiveRow();

  useImperativeHandle(ref, () => ({
    onVirtualKeyClick,
  }));

  return <Row text={text} type="rowActive" />;
});
export default ActiveRow;
