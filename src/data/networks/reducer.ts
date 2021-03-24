import { AnyAction } from "redux";
import {
  SET_NETWORK
} from "./constants";

export type Network = 
  | "mainnet"
  | "testnet";

export type State = {
  currentNetwork: Network;
}

export const initialState: State = {
  currentNetwork: "testnet"
}

const updateNetwork = (state: State, network: Network) => {
  return {
    ...state,
    currentNetwork: network
  }
}

const networks = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_NETWORK:
      return updateNetwork(state, action.payload);

    default:
      return state;
  }
}

export default networks;