import { bchjs } from "./bch-js-utils";
import { getStore } from "../data/store";
import { NetworkCode } from "../../utils/network-utils";

const generateMnemonic = () => {
  const mnemonic = bchjs.Mnemonic.generate(128);
  return mnemonic;
};

const deriveAccount = async (
  mnemonic: string,
  accountIndex: number = 0,
  childIndex: number = 0,
  hdPathString: string,
  network: NetworkCode
) => {
  if (!mnemonic) {
    throw new Error("Mnemonic required to derive account");
  }

  console.log("Current Network is ", network);

  const seed = await bchjs.Mnemonic.toSeed(mnemonic);
  const hdWallet = bchjs.HDNode.fromSeed(seed, network);

  const rootNode = bchjs.HDNode.derivePath(hdWallet, hdPathString);
  const child = bchjs.HDNode.derivePath(
    rootNode,
    `${accountIndex}'/0/${childIndex}`
  );
  const keypair = bchjs.HDNode.toKeyPair(child);
  const address = bchjs.ECPair.toCashAddress(keypair);

  return {
    mnemonic,
    keypair,
    address,
    accountIndex,
  };
};

const addressToSlp = async (address: string) => {
  return await bchjs.SLP.Address.toSLPAddress(address);
};

const addressToCash = async (address: string) => {
  return await bchjs.Address.toCashAddress(address);
};

export { deriveAccount, addressToSlp, addressToCash, generateMnemonic };
