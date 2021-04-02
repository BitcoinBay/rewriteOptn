import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
  AnyAction
} from "redux";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxThunk, { ThunkMiddleware } from "redux-thunk";

import accountsReducer, {
  State as StateAccount,
  initialState as initialAccountState
} from "./accounts/reducer";

import transactionsReducer, {
  State as StateTransactions,
  initialState as initialTransactionsState
} from "./transactions/reducer";

import utxosReducer, {
  State as StateUTXOs,
  initialState as initialUTXOSState
} from "./utxos/reducer";

import tokensReducer, {
  State as StateTokens,
  initialState as initialTokensState
} from "./tokens/reducer";

import pricesReducer, {
  State as StatePrices,
  initialState as initialPricesState
} from "./prices/reducer";

import settingsReducer, {
  SettingsState as StateSettings,
  initialState as initialSettingsState
} from "./settings/reducer";

import networksReducer, {
  State as StateNetworks,
  initialState as initialNetworksState
} from "./networks/reducer";

export type FullState = {
  accounts: StateAccount;
  prices: StatePrices;
  tokens: StateTokens;
  transactions: StateTransactions;
  utxos: StateUTXOs;
  settings: StateSettings;
  networks: StateNetworks;
  _persist?: PersistState;
};

const initialState: FullState = {
  accounts: initialAccountState,
  prices: initialPricesState,
  tokens: initialTokensState,
  transactions: initialTransactionsState,
  utxos: initialUTXOSState,
  settings: initialSettingsState,
  networks: initialNetworksState,
};

// TODO - Setup encryption on certain parts of the redux state
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["utxos", "tokens", "transactions", "settings"],
  timeout: 0,
};

// keypairs are re-computed each time the app launches, cannot persist complex objects easily.
const accountsPersistConfig = {
  key: "accounts",
  storage: AsyncStorage,
  blacklist: ["keypairsByAccount"]
};

const pricesPersistConfig = {
  key: "prices",
  storage: AsyncStorage,
  whitelist: ["currencySelected"]
};

const rootReducer = combineReducers({
  accounts: persistReducer(accountsPersistConfig, accountsReducer),
  prices: persistReducer(pricesPersistConfig, pricesReducer),
  tokens: tokensReducer,
  transactions: transactionsReducer,
  utxos: utxosReducer,
  settings: settingsReducer,
  networks: networksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Logger: Middleware = (store) => (next) => (action) => {
  if (__DEV__) {
    // Uncomment to enable debug logging
    let hours = new Date().getHours(); //To get the Current Hours
    let min = new Date().getMinutes(); //To get the Current Minutes
    let sec = new Date().getSeconds(); //To get the Current Seconds
    //    console.log(hours, ":", min, ":", sec, "::LOG_ACTION::", action);
  }

  return next(action);
};

const middleware = [
  Logger,
  ReduxThunk as ThunkMiddleware<FullState, AnyAction>
];

const getStore = () => {
  // The ignore here is because it wants initialState to have all of the persist information.
  // Try removing after updating libraries
  const store = createStore(
    persistedReducer,
    // @ts-ignore
    initialState,
    applyMiddleware(...middleware)
  );
  const persistor = persistStore(store);
  return {
    store,
    persistor
  };
};

export { getStore };
