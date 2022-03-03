import { ADD_PROBLEM_TYPE, SET_PROBLEM_TYPE, DELETE_PROBLEM_TYPE } from "../types";

const ProblemsTypeReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case ADD_PROBLEM_TYPE:
    return {
      ...state,
      problemsTypes: [...state.problemsTypes, payload],
    };
  case SET_PROBLEM_TYPE:
    return {
      ...state,
      problemsTypes: payload,
    };
  case DELETE_PROBLEM_TYPE:
    return {
      ...state,
      problemsTypes: state.problemsTypes.filter((problemType) => problemType.id !== payload),
    };
  default:
    return state;
  }
};

export default ProblemsTypeReducer;
