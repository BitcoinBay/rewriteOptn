import { createSelector } from "reselect";
import { FullState } from "../store";

// export type Balance = {
//   satoshisAvailable: BigNumber;
//   // satoshisLockedInMintingBaton: BigNumber;
//   // satoshisLockedInTokens: BigNumber;
//   slpTokens: {
//     [tokenId: string]: BigNumber;
//   };
// };
// export type State = {
//   byAccount: {
//     [accountId: string]: Balance;
//   };
//   activeBchId?: string | null;
//   activeSlpId?: string | null;
//   updating: boolean;
// };

const balanceByAccountSelector = (state: FullState) => state.balances.byAccount;
const activeBchIdSelector = (state: FullState) => state.balances.activeBchId;
const activeSlpIdSelector = (state: FullState) => state.balances.activeSlpId;

const getBchBalancesSelector = createSelector(
  balanceByAccountSelector,
  activeBchIdSelector,
  (byAccount, activeBchId) => {
    return activeBchId && byAccount[activeBchId]
      ? byAccount[activeBchId].satoshisAvailable
      : null;
  }
);

const getSlpBalanceSelector = createSelector(
  balanceByAccountSelector,
  activeSlpIdSelector,
  (byAccount, activeSlpId) => {
    return activeSlpId ? byAccount[activeSlpId].slpTokens : null;
  }
);

export { getBchBalancesSelector, getSlpBalanceSelector };
