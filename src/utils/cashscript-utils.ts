import {
  Contract,
  SignatureTemplate,
  ElectrumNetworkProvider,
} from "cashscript";
import { compileString } from "cashc";
import bchaddr from "bchaddrjs";

import P2pkhArtifact from "./cashscript/P2PKH.json";

interface AbiInput {
  name: string; // Input name
  type: string; // Input type (see language documentation)
}

interface AbiFunction {
  name: string; // Function name
  covenant: boolean; // Does this function use covenant variables
  inputs: AbiInput[]; // Function inputs / parameters
}

interface Artifact {
  contractName: string; // Contract name
  constructorInputs: AbiInput[]; // Arguments required to instantiate a contract
  abi: AbiFunction[]; // functions that can be called
  bytecode: string; // Compiled Script without constructor parameters added (in ASM format)
  source: string; // Source code of the CashScript contract
  networks: {
    // Dictionary per network (testnet / mainnet)
    [network: string]: {
      // Dictionary of contract addresses with the corresponding compiled script (in ASM format)
      [address: string]: string;
    };
  };
  compiler: {
    name: string; // Compiler used to compile this contract
    version: string; // Compiler version used to compile this contract
  };
  updatedAt: string; // Last datetime this artifact was updated (in ISO format)
}

const selectContract = (type: string) => {
  let artifactSource;
  switch (type) {
    case "P2PKH":
      artifactSource = P2pkhArtifact.source;
      break;
    default:
      break;
  }

  return artifactSource;
};

const compileContract = (type: string, params: any) => {
  let artifactSource = selectContract(type);
  if (!artifactSource) return null;

  const artifact = compileString(artifactSource);
  const provider = new ElectrumNetworkProvider("testnet");
  const contract = new Contract(artifact, [...params], provider);
  return contract;
};

export { AbiInput, AbiFunction, Artifact, compileContract };
