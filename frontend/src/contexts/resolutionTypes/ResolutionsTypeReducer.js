import { ADD_RESOLUTION_TYPE, SET_RESOLUTION_TYPE, DELETE_RESOLUTION_TYPE } from "../types";

const ResolutionsTypeReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case ADD_RESOLUTION_TYPE:
    return {
      ...state,
      resolutionsTypes: [...state.resolutionsTypes, payload],
    };
  case SET_RESOLUTION_TYPE:
    return {
      ...state,
      resolutionsTypes: payload,
    };
  case DELETE_RESOLUTION_TYPE:
    return {
      ...state,
      resolutionsTypes: state.resolutionsTypes.filter((resolutionType) => resolutionType.id !== payload),
    };
  default:
    return state;
  }
};

export default ResolutionsTypeReducer;
