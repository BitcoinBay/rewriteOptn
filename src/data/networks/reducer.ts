import { AnyAction } from "redux";
import { SET_NETWORK } from "./constants";

import { NetworkCode } from "../../utils/network-utils";

export interface Network {
  network: string;
}

export type State = {
  currentNetwork: NetworkCode;
};

export const initialState: State = {
  currentNetwork: "mainnet",
};

const updateNetwork = (state: State, networkCode: NetworkCode) => {
  return {
    ...state,
    currentNetwork: networkCode,
  };
};

const networks = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_NETWORK:
      return updateNetwork(state, action.payload);

    default:
      return state;
  }
};

export default networks;
