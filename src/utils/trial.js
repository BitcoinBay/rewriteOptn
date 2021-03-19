const BCHJS = require("@psf/bch-js");

const bchjs = new BCHJS();

async function main() {
  const utxos = await bchjs.Ninsight.utxo("bitcoincash:qqakphm6jqeteh902n59h2jct706n4srpuzp95a5qh");
  console.log(utxos);
  // const utxoInfo = await bchjs.SLP.Utils.tokenUtxoDetails(
  //   utxos.utxos, 
  //   // Delay 100mS between processing UTXOs, to prevent rate-limit errors.
  //   { utxoDelay: 100 }
  // );
  // console.log(utxoInfo);
}
main();