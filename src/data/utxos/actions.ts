import { chunk } from "lodash";

import {
  UPDATE_UTXO_START,
  UPDATE_UTXO_SUCCESS,
  UPDATE_UTXO_FAIL
} from "./constants";
import { UTXO } from "./reducer";

import { activeAccountIdSelector } from "../accounts/selectors";

import { FullState } from "../store";

import {
  getTokenMetadata,
  getAllSLPUtxo,
  getTransactionDetails,
  getAddressUtxos
} from "../../utils/transaction-utils";

import { bchjs } from "../../utils/bch-js-utils";


const updateUtxoStart = () => ({
  type: UPDATE_UTXO_START,
  payload: null
});

const updateUtxoSuccess = (utxos: any[]) => ({
  type: UPDATE_UTXO_SUCCESS,
  payload: {
    utxos
  }
});

const updateUtxoFail = () => ({
  type: UPDATE_UTXO_FAIL,
  payload: null
});

// const refreshUtxos = async (address: string) => {
//   // Get all UTXO for account
//   const utxoSet = await getAddressUtxos(address);
//   const bchUtxos: UTXO[] = utxoSet.bchUtxos;
//   const nullUtxos: UTXO[] = utxoSet.nullUtxos;
//   const slpMintUtxos: UTXO[] = utxoSet.type1Utxos.mintBatons
//   const slpTokenUtxos: UTXO[] = utxoSet.type1Utxos.tokens;
//   const nftMintUtxos: UTXO[] = utxoSet.slpUtxos.nft.groupMintBatons;
//   const nftGroupUtxos: UTXO[] = utxoSet.slpUtxos.nft.groupTokens;
//   const nftTokenUtxos: UTXO[] = utxoSet.slpUtxos.nft.tokens;

//   const allUtxosWithId = allUtxos.map(utxo => ({
//     ...utxo,
//     _id: computeUtxoId(utxo),
//     address: address,
//   }));

//   return allUtxosWithId;
// }

const updateUtxos = (address: string, addressSlp: string) => {
  return async (dispatch: Function, getState: Function) => {
    if (!address || !addressSlp) {
      return;
    }

    dispatch(updateUtxoStart());
    const state: FullState = getState();
    const utxosUpdatedFull = await getAddressUtxos([address, addressSlp]);

    dispatch(
      updateUtxoSuccess([...utxosUpdatedFull])
    );
  }
}

export { 
  updateUtxos,
  // refreshUtxos,
  updateUtxoStart, 
  updateUtxoSuccess, 
  updateUtxoFail 
};
