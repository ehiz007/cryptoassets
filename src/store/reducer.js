import {
  CRYPTO_REQUEST_FAILED,
  CRYPTO_REQUEST_START,
  CRYPTO_REQUEST_SUCCESSFUL,
} from "./types";

export const initialState = { assets: [], loading: false, message: "" };

export default function Reducer(state = initialState, actions) {
  switch (actions.type) {
    case CRYPTO_REQUEST_START:
      return {
        ...state,
        loading: true,
        message: "",
        assets: [],
      };
    case CRYPTO_REQUEST_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        assets: actions.payload,
      };
    case CRYPTO_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };
    default:
      return state;
  }
}
