import { createContext, useContext, useReducer } from "react";

const RowCtx = createContext();

const defaultState = {
  position: 0,
  words: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "next":
      state.position += 1;
      return state;
    case "insert":
      const newState = { ...state, words: [...state.words, payload] };
      return newState;
    default:
      return state;
  }
};

const RowCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const nextRow = () => {
    dispatch({ type: "next" });
  };

  const insertWord = (word) => {
    dispatch({ type: "insert", payload: word });
  };

  return (
    <RowCtx.Provider
      value={{
        words: state.words,
        rowPosition: state.position,
        nextRow,
        insertWord,
      }}
    >
      {children}
    </RowCtx.Provider>
  );
};

const useRowCtx = () => {
  const context = useContext(RowCtx);
  if (!context) {
    throw new Error("useRowContext must be used within a RowCtxProvider");
  }
  return context;
};

export { RowCtxProvider, useRowCtx };
