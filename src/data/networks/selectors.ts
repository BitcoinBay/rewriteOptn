import { createSelector } from "reselect";

import { FullState } from "../store";

const networksSelector = (state: FullState) => state.networks;

const currentNetworkSelector = createSelector(networksSelector, (network) => {
  return network.currentNetwork;
});

export { currentNetworkSelector };