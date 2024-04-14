import { useState } from "react";
import { useRowCtx } from "../context/RowContext.jsx";
import { useGameCtx } from "../context/GameContext.jsx";
import useKeyboard from "./useKeyboard.jsx";
import { useQueryClient } from "@tanstack/react-query";

const secondaryKeys = ["delete", "backspace", "enter"];

const useActiveRow = () => {
  const { words, insertWord, nextRow, isTextInvalid } = useRowCtx();
  const { level, target, gameStatus, updateGameStatus } = useGameCtx();

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(["targetData", level]);
  // console.log("cached-data", cachedData);

  const [text, setText] = useState("");
  // console.log("words", words);

  const formatText = (keyPressed) => {
    // console.log(keyPressed, text);
    if (words.length === target.length + 1) return;
    isTextInvalid(false);
    switch (keyPressed) {
      case "delete":
        setText((prev) => prev.slice(0, -1));
        break;
      case "backspace":
        setText((prev) => prev.slice(0, -1));
        break;
      case "enter":
        if (
          text.length === target.length &&
          words.length < target.length + 1 &&
          gameStatus === "ongoing"
        ) {
          if (cachedData.words.includes(text)) {
            // console.log("valid");
            insertWord(text);
            if (text === target) {
              updateGameStatus("won", words.length + 1);
            }
            if (text !== target && words.length === target.length) {
              updateGameStatus("lost");
            }
            nextRow();
            setText("");
            return;
          }
          isTextInvalid(true);
        }
        break;
      default:
        if (
          !secondaryKeys.includes(keyPressed) &&
          text.length < target.length &&
          gameStatus === "ongoing"
        ) {
          isTextInvalid(false);
          setText((prev) => `${prev}${keyPressed}`);
        }
    }
  };

  const { onVirtualKeyClick } = useKeyboard(formatText, text);

  return { text, onVirtualKeyClick };
};

export default useActiveRow;
