import { AnyAction } from "redux";
import {
  GET_ACCOUNT_START,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  LOGOUT_ACCOUNT,
  VIEW_SEED
} from "./constants";

export interface ECPair {
  compressed: boolean;
  d: any;
  network: any;
  __Q: any;
}

export interface Account {
  address: string;
  addressSlp: string;
  keypair?: ECPair;
  mnemonic: string;
  accountIndex: number;
  seedViewed?: boolean;
  network?: string;
}

export type State = {
  byId: {
    [accountId: string]: Account;
  };
  keypairsByAccount?: {
    [accountId: string]: {
      bch: ECPair;
      slp: ECPair;
    };
  };
  allIds: string[];
  activeId?: string | null;
};

export const initialState: State = {
  byId: {},
  allIds: [],
  activeId: null,
  keypairsByAccount: {}
};

const addAccount = (
  state: State,
  payload: {
    account: Account;
    accountSlp: Account;
    isNew: boolean;
  }
) => {
  const { account, accountSlp, isNew } = payload;

  const { keypair, ...removedKeypair } = account;
  const { address } = account;

  //  console.log("account/reducer account:", address);

  const combinedAccount = {
    ...removedKeypair,
    addressSlp: accountSlp.address,
    seedViewed: !isNew
  };

  const keypairSlp = accountSlp.keypair;

  const existingAcounts = state.allIds;

  // TODO - Investigate this early-exit, may not be needed anymore.
  if (existingAcounts.includes(address)) {
    return {
      ...state,
      keypairsByAccount: {
        ...state.keypairsByAccount,
        [address]: {
          bch: keypair,
          slp: keypairSlp
        }
      }
    };
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [address]: combinedAccount
    },
    keypairsByAccount: {
      ...state.keypairsByAccount,
      [address]: {
        bch: keypair,
        slp: keypairSlp
      }
    },
    allIds: [...state.allIds, address],
    activeId: address
  };
};

const logoutAccount = (state: State) => {
  return initialState;
};

const setSeedViewed = (
  state: State,
  payload: {
    address: string;
  }
) => {
  const { address } = payload;
  const currentAccount = state.byId[address];

  const updatedAccount = {
    ...currentAccount,
    seedViewed: true
  };
  return {
    ...state,
    byId: {
      ...state.byId,
      [address]: updatedAccount
    }
  };
};

const accounts = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case GET_ACCOUNT_START:
      return state;

    case GET_ACCOUNT_SUCCESS:
      return addAccount(state, action.payload);

    case LOGOUT_ACCOUNT:
      return logoutAccount(state);

    case VIEW_SEED:
      return setSeedViewed(state, action.payload);

    default:
      return state;
  }
};

export default accounts;