import { AnyAction } from "redux";
import BigNumber from "bignumber.js";

import {
  GET_BALANCE_FAIL,
  GET_BALANCE_START,
  GET_BALANCE_SUCCESS
} from "./constants";

export type Balance = {
  satoshisAvailable: BigNumber;
  satoshisLockedInMintingBaton: BigNumber;
  satoshisLockedInTokens: BigNumber;
  slpTokens: {
    [tokenId: string]: BigNumber;
  };
};

export type State = {
  byAccount: {
    [accountId: string]: Balance;
  };
  updating: boolean;
};

export const initialState: State = {
  byAccount: {},
  updating: false,
};

const updateBalances = (
  state: State,
  payload: {}
) => {
  return {
    ...state,
    byAccount: {
      ...state.byAccount,
    },
    updating: false
  };
}

const balances = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case GET_BALANCE_START:
      return {
        ...state,
        updating: true
      }
    
      case GET_BALANCE_START: {
        return updateBalances(state, action.payload);
      }

      case GET_BALANCE_FAIL: {
        return state;
      }

    default:
      return state;
  }
}

export default balances;