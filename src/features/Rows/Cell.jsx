import { useGameCtx } from "../../context/GameContext";

const Cell = ({ char, status }) => {
  const { target } = useGameCtx();
  return <p className={`char ${status}`}>{char.toUpperCase()}</p>;
};
export default Cell;
