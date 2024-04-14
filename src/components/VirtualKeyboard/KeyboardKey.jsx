const KeyboardKey = ({ char, click }) => {
  return (
    <button className="btnVirtualKeyboard" id={`${char}`} onClick={click}>
      {char}
    </button>
  );
};
export default KeyboardKey;
