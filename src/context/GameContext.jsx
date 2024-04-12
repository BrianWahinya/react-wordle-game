import { createContext, useContext, useReducer } from "react";
import configs from "../helpers/configs";

const GameCtx = createContext();

const levels = {
  basic: [3, 4, 5],
  intermediate: [5, 6],
  expert: [7, 8, 9],
  legendary: [9, 10, 11, 12],
};

const defaultState = {
  level: configs.activeLevel,
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
      return { ...state, lost: state.lost + 1 };
    case "won":
      return { ...state, won: state.won + 1 };
    case "changeLevel":
      return { ...state, level: payload };
    case "changeTarget":
      return { ...state, target: payload };
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

  return (
    <GameCtx.Provider
      value={{ ...state, won, lost, changeLevel, changeTarget }}
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
