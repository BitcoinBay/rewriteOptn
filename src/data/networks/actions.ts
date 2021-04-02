import { SET_NETWORK } from "./constants";
import { Network } from "./reducer";

const toggleNetwork = (network: Network) => ({
  type: SET_NETWORK,
  payload: network
});

export {
  toggleNetwork
};