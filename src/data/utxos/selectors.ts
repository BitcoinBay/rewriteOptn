import { createSelector } from "reselect";
import { FullState } from "../store";

const utxosSelector = (state: FullState) => state.utxos;

const utxosByAccountSelector = (state: FullState, address?: string | null) => {
  if (!address) return [];

  const { byId, byAccount } = state.utxos;
  const accountUtxoIds = byAccount[address];

  if (!accountUtxoIds) return [];

  return [];
  // const bchUtxos = accountUtxoIds.bchUtxos.map(utxoId => byId[utxoId]);
  // const slpMintUtxos = accountUtxoIds.slpMintUtxos.map(utxoId => byId[utxoId]);
  // const slpTokenUtxos = accountUtxoIds.slpTokenUtxos.map(utxoId => byId[utxoId]);
  
  // return {
  //   bchUtxos: bchUtxos,
  //   slpMintUtxos: slpMintUtxos,
  //   slpTokenUtxos: slpTokenUtxos
  // }; 
};

const doneInitialLoadSelector = createSelector(
  utxosByAccountSelector,
  utxos => {
    //console.log(utxos);
    return !!utxos;
  }
);

const isUpdatingUTXO = (state: FullState) => {
  return state.utxos.updating;
};

export {
  utxosSelector,
  utxosByAccountSelector,
  doneInitialLoadSelector,
  isUpdatingUTXO
};
