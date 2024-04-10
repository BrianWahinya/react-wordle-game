import { useState } from "react";
import useKeyboard from "./useKeyboard";

const useWordle = (target) => {
  const [words, setWords] = useState([]);
  const [activeWord, setActiveWord] = useState("");
  const [position, setPosition] = useState(0);

  const generateAnswers = (keyPressed) => {
    const secondaryKeys = ["delete", "backspace", "enter"];
    if (position >= target.length + 1) return;

    if (
      words.length === target.length + 1 &&
      activeWord.length === target.length
    ) {
      if (keyPressed === "enter") {
        setActiveWord("");
        setPosition((prev) => prev + 1);
        console.log("final", words);
        return;
      }
    }

    if (activeWord.length && words.length <= target.length + 1) {
      if (keyPressed === "delete" || keyPressed === "backspace") {
        const modifiedWord = activeWord.slice(0, -1).slice(0, target.length);
        setWords((prev) => {
          prev[position] = modifiedWord;
          return prev;
        });
        setActiveWord(modifiedWord);
        return;
      }
    }

    if (
      activeWord.length === target.length &&
      words.length < target.length + 1
    ) {
      if (keyPressed === "enter") {
        // setWords((prev) => [...prev, activeWord]);
        setWords((prev) => {
          prev[position] = activeWord;
          return prev;
        });
        setActiveWord("");
        setPosition((prev) => prev + 1);
        return;
      }
    }

    if (
      activeWord.length < target.length &&
      words.length <= target.length + 1
    ) {
      if (keyPressed && !secondaryKeys.includes(keyPressed)) {
        const modifiedWord = `${activeWord}${keyPressed}`;
        setActiveWord(modifiedWord);
        setWords((prev) => {
          prev[position] = modifiedWord;
          return prev;
        });
        return;
      }
    }
  };

  const { onVirtualKeyClick } = useKeyboard(generateAnswers, activeWord);

  return { words, onVirtualKeyClick };
};
export default useWordle;
