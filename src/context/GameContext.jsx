import { createContext, useContext, useReducer } from "react";

const GameCtx = createContext();

const defaultState = {
  scores: {
    won: 0,
    lost: 0,
  },
  points: "",
  current_target: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "lost":
      state.lost += 1;
      return state;
    case "won":
      state.won += 1;
      return state;
  }
};

const GameCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const won = () => {
    dispatch({ type: "won", payload: state });
  };

  const lost = () => {
    dispatch({ type: "lost", payload: state });
  };

  return (
    <GameCtx.Provider value={{ state, won, lost }}>{children}</GameCtx.Provider>
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
