import Rows from "./Rows/Rows";
import { useWordle, useKeyboard } from "../hooks";
import { VirtualKeyboard } from "../components";

const target = "trying";

const WordleGame = () => {
  // const { keyPressed, onVirtualKeyClick } = useKeyboard();

  const { words, onVirtualKeyClick } = useWordle(target);

  return (
    <div>
      <h2>Wordle Game</h2>
      {<Rows words={words} target={target} />}
      <VirtualKeyboard onVirtualKeyClick={onVirtualKeyClick} />
    </div>
  );
};
export default WordleGame;
