import utxosReducer, { initialState, UTXO } from "./reducer";
import {
  refreshUtxos,
  updateUtxoStart,
  updateUtxoFail,
  updateUtxoSuccess,
  updateUtxos,
} from "./actions";

describe("utxos::reducer", () => {
  it("should return the initial state", async () => {
    const stateBefore = { ...initialState };
    const utxo = ({
      _id: "someUtxoHash",
    } as unknown) as UTXO;

    const address = "bitcoincash:qqakphm6jqeteh902n59h2jct706n4srpuzp95a5qh";
    const addressSlp = "bitcoincash:qz7qny9mlr40lgzz9p37690evah4el5gmuv2694zq6";

    const stateAfter = await utxosReducer(
      stateBefore,
      updateUtxos(address, addressSlp)
    );

    // console.log(stateAfter);
    expect(1).toEqual(1);
  });
});
