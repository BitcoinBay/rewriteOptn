export type NetworkCode =
  | "mainnet"
  | "testnet";

// Whitelist of supported currencies
const networkOptions: NetworkCode[] = [
    "mainnet",
    "testnet"
];

const networkNameMap: { [key in NetworkCode]: string } = {
  mainnet: "BCHN Mainnet",
  testnet: "Testnet 3"
};


export {
  networkOptions,
  networkNameMap
};
