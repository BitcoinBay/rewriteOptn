import { AnyAction } from "redux";
import { v5 as uuidv5 } from 'uuid';

import {
  UPDATE_UTXO_START,
  UPDATE_UTXO_SUCCESS,
  UPDATE_UTXO_FAIL
} from "./constants";

import { LOGOUT_ACCOUNT } from "../accounts/constants";
import { ECPair } from "../accounts/reducer";

// Generated from `uuid` cli command
const BADGER_UUID_NAMESPACE = "9fcd327c-41df-412f-ba45-3cc90970e680";

export type UTXO = {
  _id: string;
  address: string;
  keypair?: ECPair;
  txid: string;
  vout: number;
  value: number;
  height: number;
  isValid: boolean | null,
  utxoType?: string;
  tokenId?: string;
  tokenTicker?: string;
  tokenName?: string;
  tokenDocumentUrl?: string;
  tokenDocumentHash?: string;
  decimals?: number;
  tokenQty?: number;
  tokenType?: number;
  mintBatonVout?: number;
}

export type State = {
  byId: {
    [utxoId: string]: UTXO;
  };
  allIds: string[];
  byAccount: {
    [accountId: string]: {
      bchUtxos: string[];
      nullUtxos: string[];
      slpMintUtxos: string[];
      slpTokenUtxos: string[];
      slpNFTMintUtxos: string[];
      slpNFTGroupUtxos: string[];
      slpNFTTokenUtxos: string[];
    }
  };
  updating: boolean;
};

export const initialState: State = {
  byId: {},
  allIds: [],
  byAccount: {},
  updating: false
};

// Simple unique ID for each utxo
const computeUtxoId = (utxo: UTXO) =>
  uuidv5(`${utxo.txid}_${utxo.vout}`, BADGER_UUID_NAMESPACE);

const addUtxos = (
  state: State,
  payload: {
    utxos: any[];
  }
) => {
  const { utxos } = payload;
  // Currently fully replaces all utxos with passed in set.
  // In future should only add then prune completely unused ones by account

  const account1BchUtxos = utxos[0].bchUtxos.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));

  const account1NullUtxos = utxos[0].nullUtxos.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));

  const account1SlpMintUtxos = utxos[0].slpUtxos.type1.mintBatons.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));

  const account1SlpTokenUtxos = utxos[0].slpUtxos.type1.tokens.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));

  const account1SlpNFTMintUtxos = utxos[0].slpUtxos.nft.groupMintBatons.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));

  const account1SlpNFTGroupUtxos = utxos[0].slpUtxos.nft.groupTokens.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));

  const account1SlpNFTTokenUtxos = utxos[0].slpUtxos.nft.tokens.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[0].address
  }));


  const account2BchUtxos = utxos[1].bchUtxos.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const account2NullUtxos = utxos[1].nullUtxos.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const account2SlpMintUtxos = utxos[1].slpUtxos.type1.mintBatons.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const account2SlpTokenUtxos = utxos[1].slpUtxos.type1.tokens.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const account2SlpNFTMintUtxos = utxos[1].slpUtxos.nft.groupMintBatons.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const account2SlpNFTGroupUtxos = utxos[1].slpUtxos.nft.groupTokens.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const account2SlpNFTTokenUtxos = utxos[1].slpUtxos.nft.tokens.map((utxo: UTXO) => ({
    ...utxo,
    _id: computeUtxoId(utxo),
    address: utxos[1].address
  }));

  const sortedUtxos = [
    ...account1BchUtxos,
    ...account1NullUtxos,
    ...account1SlpMintUtxos,
    ...account1SlpTokenUtxos,
    ...account1SlpNFTMintUtxos,
    ...account1SlpNFTGroupUtxos,
    ...account1SlpNFTTokenUtxos,
    ...account2BchUtxos,
    ...account2NullUtxos,
    ...account2SlpMintUtxos,
    ...account2SlpTokenUtxos,
    ...account2SlpNFTMintUtxos,
    ...account2SlpNFTGroupUtxos,
    ...account2SlpNFTTokenUtxos,
  ]

  const nextById = sortedUtxos.reduce((prev, curr) => {
    return {
      ...prev,
      [curr._id]: curr
    };
  }, {});

  const nextState = {
    ...state,
    byId: nextById,
    allIds: sortedUtxos.map(utxo => utxo._id),
    byAccount: {
      ...state.byAccount,
      [utxos[0].address]: {
        bchUtxos:         account1BchUtxos.map((utxo: UTXO) => utxo._id),
        nullUtxos:        account1NullUtxos.map((utxo: UTXO) => utxo._id),
        slpMintUtxos:     account1SlpMintUtxos.map((utxo: UTXO) => utxo._id),
        slpTokenUtxos:    account1SlpTokenUtxos.map((utxo: UTXO) => utxo._id),
        slpNftMintUtxos:  account1SlpNFTMintUtxos.map((utxo: UTXO) => utxo._id),
        slpNFTGroupUtxos: account1SlpNFTGroupUtxos.map((utxo: UTXO) => utxo._id),
        slpNFTTokenUtxos: account1SlpNFTTokenUtxos.map((utxo: UTXO) => utxo._id),
      },
      [utxos[1].address]: {
        bchUtxos:         account2BchUtxos.map((utxo: UTXO) => utxo._id),
        nullUtxos:        account2NullUtxos.map((utxo: UTXO) => utxo._id),
        slpMintUtxos:     account2SlpMintUtxos.map((utxo: UTXO) => utxo._id),
        slpTokenUtxos:    account2SlpTokenUtxos.map((utxo: UTXO) => utxo._id),
        slpNftMintUtxos:  account2SlpNFTMintUtxos.map((utxo: UTXO) => utxo._id),
        slpNFTGroupUtxos: account2SlpNFTGroupUtxos.map((utxo: UTXO) => utxo._id),
        slpNFTTokenUtxos: account2SlpNFTTokenUtxos.map((utxo: UTXO) => utxo._id),
      },
    },
    updating: false
  };

  console.log("utxos::reducer::addUtxos", nextState)

  return nextState;
};

const utxos = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case UPDATE_UTXO_START:
      return {
        ...state,
        updating: true
      };

    case UPDATE_UTXO_SUCCESS:
      return addUtxos(state, action.payload);

    case UPDATE_UTXO_FAIL:
      return {
        ...state,
        updating: false
      };

    case LOGOUT_ACCOUNT:
      return initialState;

    default:
      return state;
  }
};

export default utxos;
