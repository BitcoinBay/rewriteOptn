import { chunk } from "lodash";

import {
  UPDATE_TOKENS_META_START,
  UPDATE_TOKENS_META_SUCCESS,
  UPDATE_TOKENS_META_FAIL
} from "./constants";

import { TokenData } from "./reducer";

import {
  getTransactionDetails,
  getTokenStats
} from "../../utils/transaction-utils";

const updateTokensMetaStart = () => ({
  type: UPDATE_TOKENS_META_START,
  payload: null
});

const updateTokensMetaSuccess = (tokens: (TokenData | null)[]) => ({
  type: UPDATE_TOKENS_META_SUCCESS,
  payload: {
    tokens
  }
});

const updateTokensMetaFail = () => ({
  type: UPDATE_TOKENS_META_FAIL,
  payload: null
});

const updateTokensMeta = (tokenIds: string[]) => {
  return async (dispatch: Function, getState: Function): Promise<void> => {
    dispatch(updateTokensMetaStart());
    // concat the chunked arrays
    const tokenMetadataList = tokenIds.map(txDetails => {
      try {
        return getTokenStats(txDetails);
      } catch (err) {
        console.warn("Could not parse SLP genesis:", err);
        return null;
      }
    })

    dispatch(updateTokensMetaSuccess(tokenMetadataList));
  };
};

export {
  updateTokensMeta,
  updateTokensMetaStart,
  updateTokensMetaFail,
  updateTokensMetaSuccess
};
