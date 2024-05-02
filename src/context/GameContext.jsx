import { createContext, useContext, useReducer } from "react";
import configs from "../helpers/configs";
import { deepCopy } from "../helpers/utils";

const GameCtx = createContext();

const levels = {
  basic: { won: 0, lost: 0, history: [] },
  intermediate: { won: 0, lost: 0, history: [] },
  expert: { won: 0, lost: 0, history: [] },
  legendary: { won: 0, lost: 0, history: [] },
};

// gameStatus: ongoing, won, lost

const storedData = JSON.parse(localStorage.getItem("wordle-game"));

const defaultState = {
  level: configs.activeLevel,
  gameStatus: "ongoing",
  levels: storedData?.levels || levels,
  points: "",
  target: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "lost":
      const stateLost = deepCopy(state);
      stateLost.levels[stateLost.level].lost += 1;
      stateWon.levels[stateWon.level].history.push({ [stateLost.target]: 0 });
      return stateLost;
    case "won":
      const stateWon = deepCopy(state);
      stateWon.levels[stateWon.level].won += 1;
      stateWon.levels[stateWon.level].history.push({
        [stateWon.target]: payload,
      });
      return stateWon;
    case "changeLevel":
      localStorage.setItem(
        "wordle-game",
        JSON.stringify({
          ...deepCopy(state),
          level: payload,
        })
      );
      return { ...deepCopy(state), level: payload };
    case "changeTarget":
      return { ...deepCopy(state), target: payload };
    case "changeGameStatus":
      const stateNew = deepCopy(state);
      const { status, countTrials } = payload;

      if (status === "won") {
        stateNew.levels[stateNew.level].won += 1;
        stateNew.levels[stateNew.level].history.push({
          [stateNew.target]: countTrials,
        });
      }

      if (status === "lost") {
        stateNew.levels[stateNew.level].lost += 1;
        stateNew.levels[stateNew.level].history.push({
          [stateNew.target]: 0,
        });
      }

      localStorage.setItem(
        "wordle-game",
        JSON.stringify({
          level: stateNew.level,
          levels: stateNew.levels,
        })
      );

      stateNew.gameStatus = status;

      return stateNew;
    default:
      return state;
  }
};

const GameCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const won = (count) => {
    dispatch({ type: "won", payload: count });
  };

  const lost = () => {
    dispatch({ type: "lost" });
  };

  const changeLevel = (level) => {
    dispatch({ type: "changeLevel", payload: level });
  };

  const changeTarget = (target) => {
    dispatch({ type: "changeTarget", payload: target });
  };

  const updateGameStatus = (status, countTrials) => {
    dispatch({ type: "changeGameStatus", payload: { status, countTrials } });
  };

  return (
    <GameCtx.Provider
      value={{
        ...state,
        won,
        lost,
        changeLevel,
        changeTarget,
        updateGameStatus,
      }}
    >
      {children}
    </GameCtx.Provider>
  );
};

const useGameCtx = () => {
  const context = useContext(GameCtx);
  if (!context) {
    throw new Error("useGameCtx must be used within a GameCtxProvider");
  }
  return context;
};

export { GameCtxProvider, useGameCtx };
