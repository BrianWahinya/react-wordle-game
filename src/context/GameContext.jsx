import { createContext, useContext, useReducer } from "react";
import configs from "../helpers/configs";
import { deepCopy } from "../helpers/utils";

const GameCtx = createContext();

const levels = {
  basic: { won: 0, lost: 0 },
  intermediate: { won: 0, lost: 0 },
  expert: { won: 0, lost: 0 },
  legendary: { won: 0, lost: 0 },
};

// gameStatus: ongoing, won, lost

const defaultState = {
  level: configs.activeLevel,
  gameStatus: "ongoing",
  levels,
  scores: {
    won: 0,
    lost: 0,
  },
  points: "",
  target: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "lost":
      const stateLost = deepCopy(state);
      stateLost.levels[stateLost.level].lost += 1;
      return stateLost;
    case "won":
      const stateWon = deepCopy(state);
      stateWon.levels[stateWon.level].won += 1;
      return stateWon;
    case "changeLevel":
      return { ...state, level: payload };
    case "changeTarget":
      return { ...state, target: payload };
    case "changeGameStatus":
      return { ...state, gameStatus: payload };
    default:
      return state;
  }
};

const GameCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const won = () => {
    dispatch({ type: "won" });
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

  const updateGameStatus = (status) => {
    if (status === "won") won();
    if (status === "lost") lost();
    dispatch({ type: "changeGameStatus", payload: status });
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
