import Cell from "./Cell";
import { genRandomId } from "../../helpers/utils";

const Row = ({ text, target, type }) => {
  return (
    <div className={`row ${type}`}>
      {String(text)
        .padEnd(target.length, " ")
        .split("")
        .map((item) => (
          <Cell key={genRandomId()} char={item} />
        ))}
    </div>
  );
};
export default Row;
