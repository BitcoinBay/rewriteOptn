import { chunk } from "lodash";

// import BigNumber from "bignumber.js";

// import { UTXO } from "../data/utxos/reducer";
// import { ECPair } from "../data/accounts/reducer";
import { TokenData } from "../data/tokens/reducer";

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

// Depreciating soon
const getAllUtxo = async (address: string)  => {
  try {
    const result = await bchjs.Ninsight.utxo(address);
    return result;
  } catch (e) {
    throw e;
  }
};

// Replacing 'getAllUtxo'
const getAllSLPUtxo = async (address: string) => {
  try {
    const utxos = await bchjs.Ninsight.utxo(address);
    const utxoRequests = await Promise.all(
      chunk(utxos[0].utxos, 20).map(utxoChunk => {
        return bchjs.SLP.Utils.tokenUtxoDetails(
          utxos[0].utxos, 
          // Delay 100mS between processing UTXOs, to prevent rate-limit errors.
          { utxoDelay: 300 }
        );
      })
    );
    const utxoDetailsList = [].concat(...utxoRequests);
    // console.log(utxoDetailsList)
    return utxoDetailsList;
  } catch (e) {
    throw e;
  }
}

const getAddressUtxos = async (address: string) => {
  try {
    let utxos = await bchjs.Utxo.get(address);
    return utxos
  } catch (e) {
    throw e;
  }
}

const getTokenStats = async(tokenId: string): TokenData => {
  try {
    const tokenStats = await bchjs.SLP.Utils.tokenStats(tokenId);
    return tokenStats;
  } catch (e) {
    throw e;
  }
}

const getTransactionDetails = async (txid: string | string[]) => {
  try {
    const result = await bchjs.Ninsight.txDetails(txid);
    return result;
  } catch (e) {
    throw e;
  }
};

const getTokenMetadata = async (txid: string): TokenData => {
  try {
    const decodedDataOutput = await bchjs.SLP.Utils.decodeOpReturn(txid);
    return decodedDataOutput;
  } catch (e) {
    throw e;
  }
}

const publishTx = async (hex: string) => {
  const result = await bchjs.RawTransactions.sendRawTransaction(hex);

  try {
    if (result.length === 64) {
      return result;
    }

    throw new Error(`Transaction Failed: ${result}`);
  } catch (e) {
    throw e;
  }
};

export {
  getTokenMetadata,
  getTokenStats,
  getAllUtxo,
  getAllSLPUtxo,
  getTransactionDetails,
  getAddressUtxos
};
