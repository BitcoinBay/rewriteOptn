import {
  ElectrumCluster,
  ElectrumTransport,
  ClusterOrder,
  RequestResponse,
} from "electrum-cash";

const ElectrumNetwork = async (network = "mainnet") => {
  let network = "mainnet";
  let electrum;

  if (network === "mainnet") {
    // Initialise a 2-of-3 Electrum Cluster with 6 reliable hardcoded servers
    // using the first three servers as "priority" servers
    electrum = new ElectrumCluster(
      "CashScript Application",
      "1.4.1",
      2,
      3,
      ClusterOrder.PRIORITY
    );
    electrum.addServer(
      "bch.imaginary.cash",
      50004,
      ElectrumTransport.WSS.Scheme,
      false
    );
    electrum.addServer(
      "blackie.c3-soft.com",
      50004,
      ElectrumTransport.WSS.Scheme,
      false
    );
    electrum.addServer(
      "electroncash.de",
      60002,
      ElectrumTransport.WSS.Scheme,
      false
    );
    electrum.addServer(
      "electroncash.dk",
      50004,
      ElectrumTransport.WSS.Scheme,
      false
    );
    electrum.addServer(
      "bch.loping.net",
      50004,
      ElectrumTransport.WSS.Scheme,
      false
    );
    electrum.addServer(
      "electrum.imaginary.cash",
      50004,
      ElectrumTransport.WSS.Scheme,
      false
    );
  } else if (network === "testnet") {
    // Initialise a 1-of-2 Electrum Cluster with 2 hardcoded servers
    electrum = new ElectrumCluster("CashScript Application", "1.4.1", 1, 2);
    electrum.addServer(
      "blackie.c3-soft.com",
      60004,
      ElectrumTransport.WSS.Scheme,
      false
    );
    electrum.addServer(
      "electroncash.de",
      60004,
      ElectrumTransport.WSS.Scheme,
      false
    );
    // electrum.addServer('bch.loping.net', 60004, ElectrumTransport.WSS.Scheme, false);
    // electrum.addServer('testnet.imaginary.cash', 50004, ElectrumTransport.WSS.Scheme);
  } else {
    throw new Error(
      `Tried to instantiate an ElectrumNetworkProvider for unsupported network ${network}`
    );
  }

  await electrum.ready();

  // Declare an example transaction ID.
  const transactionID =
    "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251";

  // Request the full transaction hex for the transaction ID.
  const transactionHex = await electrum.request(
    "blockchain.transaction.get",
    transactionID
  );

  // Print out the transaction hex.
  console.log(transactionHex);

  // Subscribe to block header notifications.
  await electrum.subscribe(console.log, "blockchain.headers.subscribe");

  // Close all connections.
  electrum.shutdown();
};

export { ElectrumNetwork };
