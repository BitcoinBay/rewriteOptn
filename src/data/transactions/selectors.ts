import { createSelector } from "reselect";
import _ from "lodash";

import { FullState } from "../store";

const transactionsSelector = (state: FullState) => state.transactions;

const isUpdatingTransactionsSelector = createSelector(
  transactionsSelector,
  transactions => {
    return transactions.updating;
  }
);

export { transactionsSelector, isUpdatingTransactionsSelector };