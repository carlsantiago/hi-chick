import { useReducer } from "react";
import {
  ADD_EGGS,
  ADD_MORTS,
  UPDATE_OVERVIEW,
  UPDATE_LOCATION,
} from "./actions";

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

    case UPDATE_LOCATION:
      return {
        ...state,
        location: [...action.location],
      };
    default:
      return state;
  }
};

export function useFarmReducer(initialState) {
  return useReducer(reducer, initialState);
}
