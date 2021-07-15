import { createSelector } from "reselect";
import { FullState } from "../store";

const balanceByAccountSelector = (state: FullState) => state.balances.byAccount;
const activeBchIdSelector = (state: FullState) => state.balances.activeBchId;
const activeSlpIdSelector = (state: FullState) => state.balances.activeSlpId;

const getBchBalancesSelector = createSelector(
  balanceByAccountSelector,
  activeBchIdSelector,
  (byAccount, activeBchId) => {
    return byAccount[activeBchId].satoshisAvailable;
  }
)

const getSlpBalanceSelector = createSelector(
  balanceByAccountSelector,
  activeSlpIdSelector,
  (byAccount, activeSlpId) => {
    return byAccount[activeSlpId].slpTokens;
  }
)

export {
  getBchBalancesSelector,
  getSlpBalanceSelector
}
