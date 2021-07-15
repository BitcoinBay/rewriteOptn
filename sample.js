const BCHJS = require("@psf/bch-js");
const BigNumber = require("bignumber.js");

const bchjs = new BCHJS();

async function run() {
  try{
    let bchAddr = "bitcoincash:qr4zg7xth86yzq94gl8jvnf5z4wuupzt3g4hl47n9y";
    let slpAddr = "simpleledger:qp4g0q97tq53pasnxk2rs570c6573qvylunsf5gy9e";
    let slpCashAddr = bchjs.SLP.Address.toCashAddress(slpAddr);
    const bchBalance = await bchjs.Electrumx.balance([bchAddr, slpCashAddr])
      .then(res => {
        console.log(res.balances)
      }).catch(e => console.log(e));
    const slpBalance = await bchjs.SLP.Utils.balancesForAddress([bchjs.SLP.Address.toSLPAddress(bchAddr), slpAddr])
      .then(res => {
        console.log(res)
        let bchTokenBalanceResult = {};
        let slpTokenBalanceResult = {};
        const bchAddrSlpResult = res[0];
        const slpAddrSlpResult = res[1];
        bchAddrSlpResult.forEach((result => {
          let tokenId = result.tokenId;
          let balance = result.balance;
          bchTokenBalanceResult[tokenId] = balance
        }))
        slpAddrSlpResult.forEach((result => {
          let tokenId = result.tokenId;
          let balance = result.balance;
          slpTokenBalanceResult[tokenId] = balance
        }))
        console.log(bchTokenBalanceResult)
        console.log(slpTokenBalanceResult)
      })
      .catch(e => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
run();