const Cell = ({ char, status }) => {
  return <p className={`char ${status}`}>{char.toUpperCase()}</p>;
};
export default Cell;
