import { createSelector } from "reselect";
import BigNumber from "bignumber.js";
import _ from "lodash";

import { utxosByAccountSelector } from "./utxos/selectors";

// number, but actually BigNumber.
export type Balances = {
  satoshisAvailable: BigNumber;
  satoshisLockedInMintingBaton: BigNumber;
  satoshisLockedInTokens: BigNumber;
  slpTokens: {
    [tokenId: string]: BigNumber;
  };
};

const balancesSelector = createSelector(utxosByAccountSelector, (utxos) => {
  const balancesInitial: Balances = {
    satoshisAvailable: new BigNumber(0),
    satoshisLockedInMintingBaton: new BigNumber(0),
    satoshisLockedInTokens: new BigNumber(0),
    slpTokens: {},
  };
  if (!utxos) return balancesInitial;

  const balances = balancesInitial;
  // const balances: Balances = utxos.reduce((prev, utxo) => {
  //   if (!utxo) return prev;

  //   if (utxo.utxoType || utxo.isValid !== false) {
  //     if (utxo.utxoType === "minting-baton") {
  //       return {
  //         ...prev,
  //         satoshisLockedInMintingBaton: prev.satoshisLockedInMintingBaton.plus(
  //           utxo.satoshis
  //         )
  //       };
  //     // Failsafe for REST call times out and returns null for slp details
  //     } else {
  //       const { tokenId, tokenQty } = utxo;
  //       const previousQuantity = prev.slpTokens[tokenId] || new BigNumber(0);
  //       return {
  //         ...prev,
  //         satoshisLockedInTokens: prev.satoshisLockedInTokens.plus(
  //           utxo.satoshis
  //         ),
  //         slpTokens: {
  //           ...prev.slpTokens,
  //           [tokenId]: previousQuantity.plus(tokenQty)
  //         }
  //       };
  //     }
  //   }

  //   if (utxo.isValid === false) {
  //     return {
  //       ...prev,
  //       satoshisAvailable: prev.satoshisAvailable.plus(utxo.satoshis)
  //     };
  //   }

  //   return prev;
  // }, balancesInitial);
  return balances;
});

export { balancesSelector };
