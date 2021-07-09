import { createSelector } from "reselect";
import { FullState } from "../store";

const balanceSelector = (state: FullState) => state.balances;
const balanceByAccountSelector = (state: FullState) => state.balances.byAccount;

const getBalancesSelector = createSelector(
  balanceByAccountSelector,
  (byAccount) => {
    return byAccount;
  }
)

export {
  getBalancesSelector
}
