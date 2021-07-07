import { AnyAction } from "redux";

import {
  GET_TRANSACTIONS_START,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL
} from "./constants";

// Transaction shape in redux store
export type Transaction = {
  hash: string;
  txParams: {
    from?: string | null;
    to: string | null;
    transactionType?: string;
    fromAddresses: string[];
    toAddresses: string[];
    value?: string;
    valueBch: number;
    sendTokenData?: {
      tokenProtocol: "slp";
      tokenId: string;
      valueToken: string;
    };
  };
  time: number;
  block: number;
  networkId: "mainnet" | "testnet";
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
  lastUpdate: +new Date()
};

const transactions = (
  state: State = initialState,
  action: AnyAction
): State => {
  switch (action.type) {
    case GET_TRANSACTIONS_START:
      return {
        ...state,
        updating: true
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