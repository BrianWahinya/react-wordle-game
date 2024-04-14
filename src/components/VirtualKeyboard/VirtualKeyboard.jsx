import { genRandomStr } from "../../helpers/utils";
import KeyboardRow from "./KeyboardRow";
import "./css/virtualkeyboard.css";

const lanes = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["delete", "z", "x", "c", "v", "b", "n", "m", "enter"],
];

const VirtualKeyboard = ({ click }) => {
  return (
    <div className="divKeyboard">
      {lanes.map((lane) => (
        <KeyboardRow
          key={`keyboard_row_${genRandomStr(4)}`}
          keys={lane}
          click={click}
        />
      ))}
    </div>
  );
};
export default VirtualKeyboard;
