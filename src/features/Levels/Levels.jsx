import { useGameCtx } from "../../context/GameContext";
import "./css/levels.css";

const Levels = () => {
  const { level, changeLevel, updateGameStatus } = useGameCtx();

  const selectLevel = (e) => {
    e.preventDefault();
    if (e.target.value) {
      changeLevel(e.target.value.toLowerCase());
      updateGameStatus("ongoing");
    }
  };

  return (
    <select onChange={selectLevel} value={level}>
      <optgroup label="Choose a level:">
        <option value="basic">Basic</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
        <option value="legendary">Legendary</option>
      </optgroup>
    </select>
  );
};
export default Levels;
