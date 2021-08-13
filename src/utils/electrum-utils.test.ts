import ElectrumNetwork from "./electrum-utils";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

describe("transaction-utils", () => {
  it("getTxHistory", async () => {
    const address = "bitcoincash:qr4zg7xth86yzq94gl8jvnf5z4wuupzt3g4hl47n9y";
    const electrum = new ElectrumNetwork();
    const txHistory = await electrum.getTxHistory(address);
    console.log(txHistory);
    await electrum.disconnectCluster();
    expect(1).toEqual(1);
  });
});
