import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
  AnyAction
} from "redux";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import ReduxThunk, { ThunkMiddleware } from "redux-thunk";

import accountsReducer, {
  State as StateAccount,
  initialState as initialAccountState
} from "./accounts/reducer";

import pricesReducer, {
  State as StatePrices,
  initialState as initialPricesState
} from "./prices/reducer";

export type FullState = {
  accounts: StateAccount;
  prices: StatePrices;
  _persist?: PersistState;
};

const initialState: FullState = {
  accounts: initialAccountState,
  prices: initialPricesState,
};

// TODO - Setup encryption on certain parts of the redux state
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: []
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
