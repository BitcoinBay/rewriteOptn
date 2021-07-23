import {
  UPDATE_UTXO_START,
  UPDATE_UTXO_SUCCESS,
  UPDATE_UTXO_FAIL,
} from "./constants";

import { FullState } from "../store";

import { getAddressUtxos } from "../../utils/transaction-utils";

const updateUtxoStart = () => ({
  type: UPDATE_UTXO_START,
  payload: null,
});

const updateUtxoSuccess = (utxos: any[]) => ({
  type: UPDATE_UTXO_SUCCESS,
  payload: {
    utxos,
  },
});

const updateUtxoFail = () => ({
  type: UPDATE_UTXO_FAIL,
  payload: null,
});

const updateUtxos = (address: string, addressSlp: string) => {
  return async (dispatch: Function, getState: Function) => {
    if (!address || !addressSlp) {
      return;
    }

    dispatch(updateUtxoStart());
    const state: FullState = getState();
    const utxosUpdatedFull = await getAddressUtxos([address, addressSlp]);

    dispatch(updateUtxoSuccess([...utxosUpdatedFull]));
  };
};

export { updateUtxos, updateUtxoStart, updateUtxoSuccess, updateUtxoFail };
