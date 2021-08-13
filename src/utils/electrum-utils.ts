import {
  ElectrumCluster,
  ElectrumTransport,
  ClusterOrder,
  RequestResponse,
} from "electrum-cash";

import { Transaction } from "../data/transactions/reducer";

export default class ElectrumNetwork {
  private electrum: ElectrumCluster;
  private concurrentRequests: number = 0;

  constructor(public network: string = "mainnet", electrum?: ElectrumCluster) {
    // If a custom Electrum Cluster is passed, we use it instead of the default.
    if (electrum) {
      this.electrum = electrum;
      return;
    }

    if (network === "mainnet") {
      // Initialise a 2-of-3 Electrum Cluster with 6 reliable hardcoded servers
      // using the first three servers as "priority" servers
      this.electrum = new ElectrumCluster(
        "Electrum cluster example",
        "1.4.1",
        2,
        3
      );
      this.electrum.addServer("bch.imaginary.cash");
      this.electrum.addServer("electroncash.de");
      this.electrum.addServer("electroncash.dk");
      this.electrum.addServer("electron.jochen-hoenicke.de", 51002);
      this.electrum.addServer("electrum.imaginary.cash");
    } else if (network === "testnet") {
      // Initialise a 1-of-2 Electrum Cluster with 2 hardcoded servers
      this.electrum = new ElectrumCluster(
        "CashScript Application",
        "1.4.1",
        1,
        2
      );
      this.electrum.addServer(
        "blackie.c3-soft.com",
        60004,
        ElectrumTransport.WSS.Scheme,
        false
      );
      this.electrum.addServer(
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
  }

  async getTxHistory(address: string): Promise<unknown[]> {
    const txList: Transaction[] | unknown[] = await this.performRequest(
      "blockchain.address.get_history",
      address
    )
      .then((res) => {
        let list: Transaction[];
        res.forEach(async (tx) => {
          const transactionHex: Transaction = await this.performRequest(
            "blockchain.transaction.get",
            tx.tx_hash,
            true
          );
          list.push(transactionHex);
          console.log("List", list);
        });
        return list;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

    return txList;
  }

  async connectCluster(): Promise<void[]> {
    try {
      return await this.electrum.startup();
    } catch (e) {
      return [];
    }
  }

  async disconnectCluster(): Promise<boolean[]> {
    return this.electrum.shutdown();
  }

  private shouldConnect(): boolean {
    if (this.concurrentRequests !== 0) return false;
    return true;
  }

  private shouldDisconnect(): boolean {
    if (this.concurrentRequests !== 1) return false;
    return true;
  }

  private async performRequest(
    name: string,
    ...parameters: (string | number | boolean)[]
  ): Promise<RequestResponse> {
    // Only connect the cluster when no concurrent requests are running
    if (this.shouldConnect()) {
      this.connectCluster();
    }

    this.concurrentRequests += 1;

    await this.electrum.ready();

    let result;
    try {
      result = await this.electrum.request(name, ...parameters);
    } finally {
      // Always disconnect the cluster, also if the request fails
      // as long as no other concurrent requests are running
      if (this.shouldDisconnect()) {
        await this.disconnectCluster();
      }
    }

    this.concurrentRequests -= 1;

    if (result instanceof Error) throw result;

    return result;
  }
}
