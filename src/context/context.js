import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const GlobalContext = createContext("initialState");

let data = {
  theme: "light",
  student: null,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
