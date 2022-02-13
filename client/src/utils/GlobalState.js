import React, { createContext, useContext } from "react";
import { useFarmReducer } from "./reducers";

const FarmContext = createContext();
const { Provider } = FarmContext;

const FarmProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useFarmReducer({});

  return <Provider value={[state, dispatch]} {...props} />;
};

const useFarmContext = () => {
  return useContext(FarmContext);
};

export { FarmProvider, useFarmContext };
