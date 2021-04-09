import {
  GET_ACCOUNT_START,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  LOGOUT_ACCOUNT,
  VIEW_SEED
} from "./constants";

import { Account } from "./reducer";

import { deriveAccount, generateMnemonic } from "../../utils/account-utils";

import {
  currentNetworkSelector
} from "../networks/selectors";
import {
  initialState,
  State
} from "../networks/reducer";
import { FullState } from "../store";


const getAccountStart = () => ({
  type: GET_ACCOUNT_START,
  payload: null
});

const getAccountSuccess = (
  account: Account,
  accountSlp: Account,
  isNew: boolean
) => ({
  type: GET_ACCOUNT_SUCCESS,
  payload: {
    account,
    accountSlp,
    isNew
  }
});

const getAccountFail = () => ({
  type: GET_ACCOUNT_FAIL,
  payload: null
});

const getAccount = (mnemonic?: string, accountIndex: number = 0) => {
  const accountMnemonic = mnemonic ? mnemonic : generateMnemonic();
  const isNew = !mnemonic;

  return async (dispatch: Function, getState: Function) => {
    dispatch(getAccountStart());

    const derivationPathBCH = "m/44'/145'";
    const derivationPathSLP = "m/44'/245'";


    const networkState = {
      ...initialState
    } as State;
    const state = ({ networks: networkState } as unknown) as FullState;
    const network = currentNetworkSelector(state);
    console.log("Network from account actions:",network);

    const childIndex = 0;
    //  TODO - Error or fail state
    const account = (await deriveAccount(
      accountMnemonic,
      accountIndex,
      childIndex,
      derivationPathBCH,
      network
    )) as Account;

    const accountSlp = (await deriveAccount(
      accountMnemonic,
      accountIndex,
      childIndex,
      derivationPathSLP,
      network
    )) as Account;

    //    console.log(account);

    dispatch(getAccountSuccess(account, accountSlp, isNew));
  };
};

const logoutAccount = () => {
  return {
    type: LOGOUT_ACCOUNT,
    payload: null
  };
};

const viewSeed = (address: string) => {
  return {
    type: VIEW_SEED,
    payload: {
      address
    }
  };
};

export {
  getAccount,
  getAccountStart,
  getAccountSuccess,
  getAccountFail,
  logoutAccount,
  viewSeed
};