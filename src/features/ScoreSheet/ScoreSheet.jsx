import { useGameCtx } from "../../context/GameContext";
import configs from "../../helpers/configs";
import "./scoresheet.css";

const ScoreSheet = () => {
  const { levels, gameStatus } = useGameCtx();

  return (
    <div className="divScoresheet">
      {gameStatus !== "ongoing" && (
        <p className={`pGamestatus ${gameStatus}`}>{gameStatus}</p>
      )}
      <h4>Scoresheet</h4>
      <div className="divScores">
        {Object.keys(configs.api.levels).map((lvl, idx) => {
          const { won, lost } = levels[lvl];
          return (
            <p key={`${lvl}-${idx}`} className="pScoresheet">
              <span className="pLevel">{lvl}</span>
              <br />
              <span>Won: {won}</span>&nbsp;&nbsp;<span>Lost: {lost}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default ScoreSheet;
