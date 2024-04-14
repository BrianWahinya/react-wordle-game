import { createContext, useContext, useReducer } from "react";

const RowCtx = createContext();

const defaultState = {
  position: 0,
  invalidText: false,
  words: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "next":
      return { ...state, position: state.position + 1 };
    case "insert":
      return { ...state, words: [...state.words, payload] };
    case "invalidText":
      return { ...state, invalidText: payload };
    case "clear":
      return defaultState;
    default:
      return state;
  }
};

const RowCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const nextRow = () => {
    dispatch({ type: "next" });
  };

  const isTextInvalid = (status) => {
    dispatch({ type: "invalidText", payload: status });
  };

  const insertWord = (word) => {
    dispatch({ type: "insert", payload: word });
  };

  const clearList = () => {
    dispatch({ type: "clear" });
  };

  return (
    <RowCtx.Provider
      value={{
        ...state,
        rowPosition: state.position,
        nextRow,
        insertWord,
        clearList,
        isTextInvalid,
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
