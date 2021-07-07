import BigNumber from "bignumber.js";

import {
  GET_BALANCE_FAIL,
  GET_BALANCE_START,
  GET_BALANCE_SUCCESS
} from "./constants";

import {
  getBchBalance,
  getSlpBalance
} from "../../utils/balance-utils";
import { FullState } from "../store";

const getBalancesStart = () => ({
  type: GET_BALANCE_START,
  payload: null
});

const getBalancesSuccess = () => ({
  type: GET_BALANCE_SUCCESS,
  payload: {}
});

const getBalancesFail = () => ({
  type: GET_BALANCE_FAIL,
  payload: null
});

const updateBalances = (address: string, addressSlp: string) => {
  return async (dispatch: Function, getState: Function) => {
    if (!address || !addressSlp) {
      return;
    }

    dispatch(getBalancesStart());
    const state: FullState = getState();
    const fullBalanceSet = []
    const bchBalances = await getBchBalance([address, addressSlp]);
    const slpBalances = await getSlpBalance([address, addressSlp]);
  }
}

export {
  updateBalances,
  getBalancesFail,
  getBalancesStart,
  getBalancesSuccess
};