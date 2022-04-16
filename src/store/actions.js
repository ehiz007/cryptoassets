import {
  CRYPTO_REQUEST_FAILED,
  CRYPTO_REQUEST_START,
  CRYPTO_REQUEST_SUCCESSFUL,
} from "./types";

export const failedRequest = (message) => ({
  type: CRYPTO_REQUEST_FAILED,
  payload: message,
});

export const requestSuccessful = (data) => ({
  type: CRYPTO_REQUEST_SUCCESSFUL,
  payload: data,
});

export const requestStart = {
  type: CRYPTO_REQUEST_START,
};
