import { genRandomStr } from "../../helpers/utils";
import KeyboardKey from "./KeyboardKey";

const KeyboardRow = ({ keys, click }) => {
  return (
    <div>
      {keys.map((char) => (
        <KeyboardKey
          key={`keyboard_key_${char}_${genRandomStr(3)}`}
          char={char}
          click={click}
        />
      ))}
    </div>
  );
};
export default KeyboardRow;
