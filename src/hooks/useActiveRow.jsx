import { useState } from "react";
import { useRowCtx } from "../context/RowContext.jsx";
import { useGameCtx } from "../context/GameContext.jsx";
import useKeyboard from "./useKeyboard.jsx";

const secondaryKeys = ["delete", "backspace", "enter"];

const useActiveRow = (target) => {
  const { words, insertWord, nextRow } = useRowCtx();
  const [text, setText] = useState("");
  // console.log("words", words);

  const formatText = (keyPressed) => {
    // console.log(keyPressed, text);
    if (words.length === target.length + 1) return;
    switch (keyPressed) {
      case "delete":
        setText((prev) => prev.slice(0, -1));
        break;
      case "backspace":
        setText((prev) => prev.slice(0, -1));
        break;
      case "enter":
        if (text.length === target.length && words.length < target.length + 1) {
          insertWord(text);
          nextRow();
          setText("");
        }
        break;
      default:
        if (
          !secondaryKeys.includes(keyPressed) &&
          text.length < target.length
        ) {
          setText((prev) => `${prev}${keyPressed}`);
        }
    }
  };

  const { onVirtualKeyClick } = useKeyboard(formatText, text);

  return { text, onVirtualKeyClick };
};

export default useActiveRow;
