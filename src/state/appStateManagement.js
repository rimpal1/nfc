import React, { createContext, useReducer, useMemo } from "react";
import { stateReducer, initialState } from "./stateReducer";

export const AppContext = createContext({});
export const AppProvider = props => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const contextVal = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  );
  return (
    <AppContext.Provider value={contextVal}>
      {props.children}
    </AppContext.Provider>
  );
};
