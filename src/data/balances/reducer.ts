import { AnyAction } from "redux";
import BigNumber from "bignumber.js";
import { bchjs } from "../../utils/bch-js-utils";

import {
  GET_BALANCE_FAIL,
  GET_BALANCE_START,
  GET_BALANCE_SUCCESS
} from "./constants";

export type Balance = {
  satoshisAvailable: BigNumber;
  // satoshisLockedInMintingBaton: BigNumber;
  // satoshisLockedInTokens: BigNumber;
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
  payload: {
    bchResult: any;
    slpResult: any;
  }
) => {
  const { bchResult, slpResult } = payload;

  let bchTokenBalanceResult: {[key: string]: any} = {};
  let slpTokenBalanceResult: {[key: string]: any} = {};

  // BCH Address
  slpResult[0].forEach((res: any) => {
    bchTokenBalanceResult[res.tokenId] = res.balance 
  });

  // SLP Address
  slpResult[1].forEach((res: any) => {
    slpTokenBalanceResult[res.tokenId] = res.balance 
  });

  const bchBalance = {
    satoshisAvailable: bchResult.balances[0].balance.confirmed + bchResult.balances[0].balance.unconfirmed,
    slpTokens: bchTokenBalanceResult
  };
  
  const slpBalance = {
    satoshisAvailable: bchResult.balances[1].balance.confirmed + bchResult.balances[1].balance.unconfirmed,
    slpTokens: slpTokenBalanceResult
  };

  return {
    ...state,
    byAccount: {
      ...state.byAccount,
      [bchResult[0].address]: bchBalance,
      [bchResult[0].address]: slpBalance
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
    
      case GET_BALANCE_SUCCESS: {
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