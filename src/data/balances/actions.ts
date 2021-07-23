import BigNumber from "bignumber.js";
import { bchjs } from "../../utils/bch-js-utils";

import {
  GET_BALANCE_FAIL,
  GET_BALANCE_START,
  GET_BALANCE_SUCCESS,
} from "./constants";

import { getBchBalance, getSlpBalance } from "../../utils/balance-utils";
import { FullState } from "../store";

const getBalancesStart = () => ({
  type: GET_BALANCE_START,
  payload: null,
});

const getBalancesSuccess = (bchResult: any, slpResult: any) => ({
  type: GET_BALANCE_SUCCESS,
  payload: {
    bchResult,
    slpResult,
  },
});

const getBalancesFail = () => ({
  type: GET_BALANCE_FAIL,
  payload: null,
});

const updateBalances = (address: string, addressSlp: string) => {
  return async (dispatch: Function, getState: Function) => {
    dispatch(getBalancesStart());

    if (!address || !addressSlp) {
      dispatch(getBalancesFail());
      return;
    }

    const state: FullState = getState();
    const bchBalances = await getBchBalance([
      address,
      bchjs.SLP.Address.toCashAddress(addressSlp),
    ]);
    const slpBalances = await getSlpBalance([address, addressSlp]);
    dispatch(getBalancesSuccess(bchBalances, slpBalances));
  };
};

export {
  updateBalances,
  getBalancesFail,
  getBalancesStart,
  getBalancesSuccess,
};
