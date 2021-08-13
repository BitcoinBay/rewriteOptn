import { AnyAction } from "redux";

import {
  GET_TRANSACTIONS_START,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
} from "./constants";

export type Vin = {
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
  txid: string;
  vout: number;
};

export type Vout = {
  n: number;
  scriptPubKey: {
    addresses: string[];
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
  };
  value: number;
};

export type Transaction = {
  blockhash: string;
  blocktime: number;
  confirmations: number;
  txid: string;
  vin: Vin[];
  vout: Vout[];
};

export type State = {
  byId: {
    [transactionId: string]: Transaction;
  };
  allIds: string[];
  byAccount: {
    [accountId: string]: string[];
  };
  updating: boolean;
  lastUpdate: number;
};

export const initialState: State = {
  byId: {},
  allIds: [],
  byAccount: {},
  updating: false,
  lastUpdate: +new Date(),
};

const transactions = (
  state: State = initialState,
  action: AnyAction
): State => {
  switch (action.type) {
    case GET_TRANSACTIONS_START:
      return {
        ...state,
        updating: true,
      };

    // case GET_TRANSACTIONS_SUCCESS:
    //   return addTransactions(state, action.payload);

    case GET_TRANSACTIONS_FAIL:
      return state;

    default:
      return state;
  }
};

export default transactions;
