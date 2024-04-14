import { useGameCtx } from "../../context/GameContext";
import configs from "../../helpers/configs";
import "./scoresheet.css";

const ScoreSheet = () => {
  const { levels, gameStatus, target } = useGameCtx();

  return (
    <div className="divScoresheet">
      {gameStatus !== "ongoing" && (
        <p className={`pGamestatus ${gameStatus}`}>
          {gameStatus === "won" && <span>Kudos &#128526;</span>}
          {gameStatus === "lost" && <span>&#128557; It is: {target}</span>}
        </p>
      )}
      <h4>Scoresheet</h4>
      <div className="divScores">
        {Object.keys(configs.api.levels).map((lvl, idx) => {
          const { won, lost, history } = levels[lvl];
          //   console.log(history);
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
