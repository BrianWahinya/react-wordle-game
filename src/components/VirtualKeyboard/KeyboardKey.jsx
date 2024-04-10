const KeyboardKey = ({ char, click }) => {
  return (
    <button id={`${char}`} onClick={click}>
      {char}
    </button>
  );
};
export default KeyboardKey;
