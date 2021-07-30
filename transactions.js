const BCHJS = require("@psf/bch-js");
const BigNumber = require("bignumber.js");

const {
  ElectrumCluster,
  ElectrumTransport,
  ClusterOrder,
} = require("electrum-cash");

const bchjs = new BCHJS();

async function electrumNetwork(network = "mainnet") {
  let electrum;

  if (network === "mainnet") {
    // Initialise a 2-of-3 Electrum Cluster with 6 reliable hardcoded servers
    // using the first three servers as "priority" servers
    electrum = new ElectrumCluster("Electrum cluster example", "1.4.1", 2, 3);
    electrum.addServer("bch.imaginary.cash");
    electrum.addServer("electroncash.de");
    electrum.addServer("electroncash.dk");
    electrum.addServer("electron.jochen-hoenicke.de", 51002);
    electrum.addServer("electrum.imaginary.cash");
  } else if (network === "testnet") {
    // Initialise a 1-of-2 Electrum Cluster with 2 hardcoded servers
    electrum = new ElectrumCluster("CashScript Application", "1.4.1", 1, 2);
    electrum.addServer(
      "blackie.c3-soft.com",
      60004
      // ElectrumTransport.WSS.Scheme,
      // false
    );
    electrum.addServer(
      "electroncash.de",
      60004
      // ElectrumTransport.WSS.Scheme,
      // false
    );
    // electrum.addServer('bch.loping.net', 60004, ElectrumTransport.WSS.Scheme, false);
    // electrum.addServer('testnet.imaginary.cash', 50004, ElectrumTransport.WSS.Scheme);
  } else {
    throw new Error(
      `Tried to instantiate an ElectrumNetworkProvider for unsupported network ${network}`
    );
  }

  await electrum.ready();

  const bchAddr = "bitcoincash:qr4zg7xth86yzq94gl8jvnf5z4wuupzt3g4hl47n9y";
  const slpAddr = "simpleledger:qp4g0q97tq53pasnxk2rs570c6573qvylunsf5gy9e";
  const slpCashAddr = bchjs.SLP.Address.toCashAddress(slpAddr);

  // let txs = await bchjs.Ninsight.transactions(bchAddr);
  const transactions = await bchjs.Electrumx.transactions([
    bchAddr,
    slpCashAddr,
  ]);

  const bchTx = transactions.transactions[0].transactions;
  const slpTx = transactions.transactions[1].transactions;
  // console.log(bchTx[0].tx_hash);

  for (const tx of bchTx) {
    // Request the full transaction hex for the transaction ID.
    const transactionHex = await electrum.request(
      "blockchain.transaction.get",
      tx.tx_hash,
      true
    );

    // Print out the transaction hex.
    console.log(transactionHex);
  }

  for (const tx of slpTx) {
    // Request the full transaction hex for the transaction ID.
    const transactionHex = await electrum.request(
      "blockchain.transaction.get",
      tx.tx_hash,
      true
    );

    // Print out the transaction hex.
    console.log(transactionHex);
  }

  electrum.shutdown();
}
electrumNetwork();
// run();
