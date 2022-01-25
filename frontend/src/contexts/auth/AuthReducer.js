import { SET_SESSION } from "../types";

const CarReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case SET_SESSION:
    return {
      ...state,
      session: payload,
    };
  default:
    return state;
  }
};

export default CarReducer;
