import BCHJS from "@psf/bch-js";

const BCHN_MAINNET = "https://bchn.fullstack.cash/v4/";
const TESTNET3 = "https://testnet3.fullstack.cash/v4/";

const selectNetwork = () => {
  const network = "mainnet";
  if (network === "mainnet") {
    return BCHN_MAINNET;
  } else {
    return TESTNET3;
  }
};

const bchjs = new BCHJS({
  restURL: selectNetwork(),
});

export { bchjs };
