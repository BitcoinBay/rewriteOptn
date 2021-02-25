import BigNumber from "bignumber.js";

import { UTXO } from "../data/utxos/reducer";
import { ECPair } from "../data/accounts/reducer";
import { TokenData } from "../data/tokens/reducer";

// import { SLP } from "./slp-sdk-utils";
import { bchjs } from "./bch-js-utils";

const LOKAD_ID_HEX = "534c5000";

export interface TxParams {
  from: string;
  to: string;
  value: string;
  opReturn?: {
    data: string[];
  };
  sendTokenData?: {
    tokenId: string;
  };
}

const getAllUtxo = async (address: string) => {
  try {
    const result = await bchjs.Ninsight.utxo(address);
    return result;
  } catch (e) {
    throw e;
  }
};

const getTransactionDetails = async (txid: string | string[]) => {
  try {
    const result = await bchjs.Ninsight.txDetails(txid);
    return result;
  } catch (e) {
    throw e;
  }
};

const getTokenMetadata = (txDetails: UTXO): TokenData => {
  console.log("hi")
}

export {
  // decodeTokenMetadata,
  // decodeTxOut,
  getAllUtxo,
  getTransactionDetails,
  // signAndPublishBchTransaction,
  // signAndPublishSlpTransaction,
  // sweepPaperWallet,
  // getPaperKeypair,
  // getPaperUtxos,
  // getUtxosBalances
};
