import { currentNetworkSelector } from "./selectors";
import { initialState, State } from "./reducer";
import { FullState } from "../store";

describe("networks::selectors", () => {
  it("get network", () => {
    const networkState = {
      ...initialState,
      currentNetwork: "testnet",
    } as State;
    const state = ({ networks: networkState } as unknown) as FullState;
    console.log(currentNetworkSelector(state));
    expect(currentNetworkSelector(state)).toEqual("testnet");
  });
});
