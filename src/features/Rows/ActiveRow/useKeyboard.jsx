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
    if (e?.target?.id) {
      e.preventDefault();
      pressKey(e.target.id);
    }
  };

  useEffect(() => {
    const keyListener = (e) => pressKey(e.key);
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [keyTrigger]);

  return { onVirtualKeyClick };
};

export default useKeyboard;
