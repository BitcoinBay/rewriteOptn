import {
  getBchBalance,
  getSlpBalance
} from "./balance-utils";

describe("balance-utils", () => {
  it.todo("getBchBalance", async () => {
    let bchAddr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf";
    let slpAddr = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk"
    const bchBalances = await getBchBalance([bchAddr, slpAddr])
                          .then(res => console.log(res));
    const slpBalances = await getSlpBalance([bchAddr, slpAddr])
                          .then(res => console.log(res));
    expect(1).toEqual(1);
  });
});
