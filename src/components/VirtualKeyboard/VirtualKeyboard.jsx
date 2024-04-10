import { genRandomStr } from "../../helpers/utils";
import KeyboardRow from "./KeyboardRow";

const lanes = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["delete", "z", "x", "c", "v", "b", "n", "m", "enter"],
];

const VirtualKeyboard = ({ onVirtualKeyClick }) => {
  return (
    <div>
      {lanes.map((lane) => (
        <KeyboardRow
          key={`keyboard_row_${genRandomStr(4)}`}
          keys={lane}
          click={onVirtualKeyClick}
        />
      ))}
    </div>
  );
};
export default VirtualKeyboard;
