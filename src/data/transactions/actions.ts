import BigNumber from "bignumber.js";

import {
  GET_TRANSACTIONS_START,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
} from "./constants";

import { bchjs } from "../../utils/bch-js-utils";

import { Transaction } from "./reducer";
import { transactionsLatestBlockSelector } from "../selectors";
import { transactionsSelector } from "./selectors";

const appendBCHPrefix = (target: string) => `bitcoincash:${target}`;

const getTransactionsStart = () => ({
  type: GET_TRANSACTIONS_START,
  payload: null,
});

const getTransactionsSuccess = (
  transactions: Transaction[],
  address: string,
  timestamp: number
) => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: {
    transactions,
    address,
    timestamp,
  },
});

const getTransactionsFail = () => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: null,
});

const updateTransactions = (address: string, addressSlp: string) => {
  return async (dispatch: Function, getState: Function) => {
    if (!address || !addressSlp) return;

    const currentState = getState();
    const isUpdating = currentState.transactions.updating;
    const lastUpdate = currentState.transactions.lastUpdate || 0;

    const now = +new Date();

    // Short circuit if already processing, and it's been under 7 minutes
    if (isUpdating && now - lastUpdate < 1000 * 60 * 7) {
      return;
    }

    dispatch(getTransactionsStart());

    const latestBlock = transactionsLatestBlockSelector(currentState);
    const allTxIds = new Set(transactionsSelector(currentState).allIds);
  };
};

export { getTransactionsStart, getTransactionsSuccess, getTransactionsFail };
