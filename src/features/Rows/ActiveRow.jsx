import { forwardRef, useImperativeHandle } from "react";
import { useActiveRow } from "../../hooks";
import Row from "./Row";

const ActiveRow = forwardRef(({ target }, ref) => {
  const { text, onVirtualKeyClick } = useActiveRow(target);

  useImperativeHandle(ref, () => ({
    onVirtualKeyClick,
  }));

  return <Row text={text} target={target} type="rowActive" />;
});
export default ActiveRow;
