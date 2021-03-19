import { chunk } from "lodash";

import { 
  getAllUtxo,
  getAllSLPUtxo,
  getTransactionDetails,
  getTokenMetadata,
  getAddressUtxos
} from "./transaction-utils";

describe("transaction-utils", () => {
  // it("getAllUtxo", async () => {
  //   const testUTXO = await getAllUtxo(
  //     "bitcoincash:qqakphm6jqeteh902n59h2jct706n4srpuzp95a5qh"
  //     // "bitcoincash:qzf3lvx945fcuhq0pl697qf2gwpwjm6cpg8zcpz22j"
  //     // "bitcoincash:qz7qny9mlr40lgzz9p37690evah4el5gmuv2694zq6"
  //   );
  //   console.log(testUTXO[0].utxos);
  //   expect(testUTXO).toEqual(testUTXO);
  // });

  // it("getAllSLPUtxo", async () => {
  //   const testUTXO = await getAllSLPUtxo(
  //     "bitcoincash:qqakphm6jqeteh902n59h2jct706n4srpuzp95a5qh"
  //   );
  //   console.log(testUTXO);
  //   expect(testUTXO).toEqual(testUTXO);
  // });

  // it("getTransactionDetails", async () => {
  //   const testTxDetails = await getTransactionDetails(
  //     "c2a45482f424308b56c2d6ce08e5a0d5208156103b94cef8dd89aafa5aade730"
  //   );
  //   console.log(testTxDetails)
  //   expect(testTxDetails).toEqual(testTxDetails)

  //   const tokenIds = [
  //     "e75d179c67cb017359609c2a84b8d8a09c5e57ea124e48d94c8fbcc429a2d5df",
  //     "c2a45482f424308b56c2d6ce08e5a0d5208156103b94cef8dd89aafa5aade730"
  //   ]

  //   const transactionRequests = await Promise.all(
  //     chunk(tokenIds, 20).map(tokenIdChunk =>
  //       getTransactionDetails(tokenIdChunk)
  //     )
  //   )

  //   const tokenTxDetailsList = [].concat(...transactionRequests);
  //   console.log(tokenTxDetailsList[0]);
  //   console.log(tokenTxDetailsList[0].vin);
  //   console.log(tokenTxDetailsList[0].vout);

  //   const tokenMetadataList = tokenTxDetailsList
  //     .map(async txDetails => {
  //       const metadata = getTokenMetadata(txDetails);
  //       // await console.log(metadata)
  //       return metadata;
  //     })
  //     .filter(Boolean);

  //   // console.log(tokenMetadataList);
  //   expect(1).toEqual(1)

  // })

  // it("getTokenMetadata", async () => {
  //   try {
  //     // const testTokenDetails = await getTokenMetadata(
  //     //   "e75d179c67cb017359609c2a84b8d8a09c5e57ea124e48d94c8fbcc429a2d5df"
  //     // );
  //     const testTokenDetails2 = await getTokenMetadata(
  //       "c2a45482f424308b56c2d6ce08e5a0d5208156103b94cef8dd89aafa5aade730"
  //     );
  //     // console.log(testTokenDetails)
  //     console.log(testTokenDetails2)
  //     expect(testTokenDetails2).toEqual(testTokenDetails2)
  //   } catch (e) {
  //     console.log('not valid slp')
  //     expect(0).toEqual(0)
  //   }
  // })

  it("getAllUtxo", async () => {
    const utxos = (await getAddressUtxos(
      "bitcoincash:qqakphm6jqeteh902n59h2jct706n4srpuzp95a5qh"
      // "bitcoincash:qzf3lvx945fcuhq0pl697qf2gwpwjm6cpg8zcpz22j"
      // "bitcoincash:qz7qny9mlr40lgzz9p37690evah4el5gmuv2694zq6"

      // "bitcoincash:qzq96djt87l6k02dh4eud4kgzlmpegyyvc0853t7al"
    ))[0];

    const type1Utxos = utxos.slpUtxos.type1.tokens.concat(
      utxos.slpUtxos.type1.mintBatons
    )
    //get the nftUtxos
    let nftUtxos = utxos.slpUtxos.nft.tokens.concat(
      utxos.slpUtxos.nft.groupTokens
    )
    nftUtxos = nftUtxos.concat(utxos.slpUtxos.nft.groupMintBatons)

    //combine each of the utxo arrays
    const allUtxos = utxos.bchUtxos.concat(
      utxos.nullUtxos,
      type1Utxos,
      nftUtxos
    )
    console.log(allUtxos)

    // utxos.forEach(utxo => {
    //   console.log(utxo.bchUtxos, 
    //     "\n\n", utxo.nullUtxos, 
    //     "\n\n", utxo.slpUtxos.type1,
    //     "\n\n", utxo.slpUtxos.nft.groupMintBatons,
    //     "\n\n", utxo.slpUtxos.nft.groupTokens,
    //     "\n\n", utxo.slpUtxos.nft.tokens);
    // });
    
    expect(1).toEqual(1);
  });
});

