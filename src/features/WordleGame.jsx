import { useEffect, useState } from "react";
import Rows from "./Rows/Rows";

const target = "trying";
const options = target.length + 1;
const WordleGame = () => {
  const [words, setWords] = useState([]);
  const [activeWord, setActiveWord] = useState("");

  useEffect(() => {
    const keyPress = (key) => {
      switch (true) {
        case key === "Enter":
          return "key_enter";
        case key === "Delete":
          return "key_delete";
        case key === "Backspace":
          return "key_back";
        default:
          return /^[a-zA-Z]$/.test(key) ? key.toLowerCase() : false;
      }
    };
    const setter = (e) => {
      if (words.length < options) {
        const pressedKey = keyPress(e.key);
        const secondaryKeys = ["key_delete", "key_back", "key_enter"];
        if (pressedKey === "key_delete" || pressedKey === "key_back") {
          setActiveWord((prev) => prev.slice(0, -1));
          return;
        }
        if (pressedKey === "key_enter" && activeWord.length === target.length) {
          setWords((prev) => [...prev, activeWord]);
          setActiveWord("");
          return;
        }
        if (
          pressedKey &&
          !secondaryKeys.includes(pressedKey) &&
          activeWord.length < target.length
        ) {
          setActiveWord((prev) => `${prev}${pressedKey}`);
          return;
        }
      }
    };
    // console.log(activeWord, words, options);
    window.addEventListener("keydown", setter);
    return () => window.removeEventListener("keydown", setter);
  }, [activeWord, words]);

  const fillEmptyRows = (amount) => {
    const emptyRows = [];
    for (let i = 0; i < amount; i++) {
      emptyRows.push("");
    }
    return emptyRows;
  };

  return (
    <div>
      <h1>WordleGame</h1>
      {<Rows words={words} target={target} />}
      {
        <Rows
          words={fillEmptyRows(options - (words.length || 0))}
          target={target}
        />
      }
    </div>
  );
};
export default WordleGame;
