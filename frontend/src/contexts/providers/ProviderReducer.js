import { ADD_PROVIDER, SET_PROVIDERS, DELETE_PROVIDER, SELECT_PROVIDER } from "../types";

const ProviderReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_PROVIDER:
      return {
        ...state,
        providers: [...state.providers, payload],
      };
    case SET_PROVIDERS:
      return {
        ...state,
        providers: payload,
      }
    case DELETE_PROVIDER:
      return {
        ...state,
        providers: state.providers.filter(provider => provider.id !== payload)
      }
    case SELECT_PROVIDER:
      return {
        ...state,
        selectedProvider: payload
      }
    default:
      return state;
  }
};

export default ProviderReducer;
