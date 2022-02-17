import { useReducer } from "react";
import { ADD_EGGS, ADD_MORTS, UPDATE_OVERVIEW, UPDATE_FLOCK } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_OVERVIEW:
      return {
        ...state,
      };
    case ADD_EGGS:
      return {
        ...state,
      };

    case ADD_MORTS:
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
