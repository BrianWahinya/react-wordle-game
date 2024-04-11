import { useEffect } from "react";

const useKeyboard = (callback, keyTrigger) => {
  const pressKey = (key) => {
    const keyLower = key.toLowerCase();
    switch (true) {
      case keyLower === "enter" ||
        keyLower === "delete" ||
        keyLower === "backspace":
        callback(keyLower);
        break;
      default:
        return /^[a-zA-Z]$/.test(keyLower) ? callback(keyLower) : false;
    }
  };

  const onVirtualKeyClick = (e) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    if (e?.target?.id) {
      pressKey(e.target.id);
    }
  };

  useEffect(() => {
    const keyListener = (e) => {
      // console.log(e);
      if (e.target.id === "reload" && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        return;
      }
      pressKey(e.key);
    };

    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [keyTrigger]);

  return { onVirtualKeyClick };
};

export default useKeyboard;
