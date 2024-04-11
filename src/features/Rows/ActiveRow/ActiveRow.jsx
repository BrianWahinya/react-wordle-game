import { forwardRef, useImperativeHandle } from "react";
import Row from "../Row";
import useActiveRow from "./useActiveRow";

const ActiveRow = forwardRef(({ target }, ref) => {
  const { text, onVirtualKeyClick } = useActiveRow(target);

  useImperativeHandle(ref, () => ({
    onVirtualKeyClick,
  }));

  return <Row text={text} target={target} type="rowActive" />;
});
export default ActiveRow;
