import { SET_SESSION, SET_USERS } from "../types";

const CarReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case SET_SESSION:
    return {
      ...state,
      session: payload,
    };
  case SET_USERS:
    return {
      ...state,
      users: payload,
    }
  default:
    return state;
  }
};

export default CarReducer;
