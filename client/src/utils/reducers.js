import { useReducer } from "react";
import { UPDATE_BREED, UPDATE_LOCATION } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
      };
    case UPDATE_BREED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export function useFarmReducer(initialState) {
  return useReducer(reducer, initialState);
}
