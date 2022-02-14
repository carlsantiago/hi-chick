import { useReducer } from "react";
import { ADD_EGGS, ADD_MORTS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
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