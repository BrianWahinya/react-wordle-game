import Cell from "./Cell";
import { genRandomId } from "../../helpers/utils";
import { useGameCtx } from "../../context/GameContext";

const charStatus = (txt, char, idx) => {
  if (!txt.includes(char)) return "invalid";
  if (txt[idx] === char) return "exact";
  return "estimate";
};

const Row = ({ text, type }) => {
  const { target } = useGameCtx();
  return (
    <div className={`row ${type}`}>
      {String(text)
        .padEnd(target.length, " ")
        .split("")
        .map((item, idx) => (
          <Cell
            key={genRandomId()}
            char={item}
            status={charStatus(target, item, idx)}
          />
        ))}
    </div>
  );
};
export default Row;
