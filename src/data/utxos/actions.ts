import { v5 as uuidv5 } from 'uuid';

import {
  UPDATE_UTXO_START,
  UPDATE_UTXO_SUCCESS,
  UPDATE_UTXO_FAIL
} from "./constants";
import { UTXO } from "./reducer";

import { activeAccountIdSelector } from "../accounts/selectors";

import { FullState } from "../store";

import { bchjs } from "../../utils/bch-js-utils";

// Generated from `uuid` cli command
const BADGER_UUID_NAMESPACE = "9fcd327c-41df-412f-ba45-3cc90970e680";

const updateUtxoStart = () => ({
  type: UPDATE_UTXO_START,
  payload: null
});

const updateUtxoSuccess = (utxos: UTXO[], address: string) => ({
  type: UPDATE_UTXO_SUCCESS,
  payload: {
    utxos,
    address
  }
});

const updateUtxoFail = () => ({
  type: UPDATE_UTXO_FAIL,
  payload: null
});

// Simple unique ID for each utxo
const computeUtxoId = (utxo: UTXO) =>
  uuidv5(`${utxo.txid}_${utxo.vout}`, BADGER_UUID_NAMESPACE);

export { 
  updateUtxoStart, 
  updateUtxoSuccess, 
  updateUtxoFail 
};
