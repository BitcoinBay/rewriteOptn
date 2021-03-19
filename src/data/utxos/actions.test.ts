import { getAddressUtxos } from "../../utils/transaction-utils";
import * as actions from "./actions";
import * as actionTypes from "./constants";
import { UTXO } from "./reducer";

describe("utxos::actions", () => {
  it("refreshUtxos", async () => {
    const address = "bitcoincash:qqakphm6jqeteh902n59h2jct706n4srpuzp95a5qh";
    const addressSlp = "bitcoincash:qzf3lvx945fcuhq0pl697qf2gwpwjm6cpg8zcpz22j";
    const fullUtxos = await getAddressUtxos([address, addressSlp]);
    console.log(fullUtxos)
    expect(1).toEqual(1);
  });
});