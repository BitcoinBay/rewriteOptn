import BCHJS from "@psf/bch-js";
import { getStore } from "../data/store";

const BCHN_MAINNET = 'https://bchn.fullstack.cash/v4/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v4/'

const selectNetwork = () => {
  const { store } = getStore();
  const network = store.getState().networks.currentNetwork;
  if (network === "mainnet") {
    return BCHN_MAINNET;
  } else {
    return TESTNET3;
  }
}

const bchjs = new BCHJS({
  restURL: selectNetwork()
});

export { bchjs };
