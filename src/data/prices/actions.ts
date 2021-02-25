import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { CurrencyCode, currencyDecimalMap } from "../../utils/currency-utils";

import {
  UPDATE_BCH_SPOT_PRICE_START,
  UPDATE_BCH_SPOT_PRICE_SUCCESS,
  UPDATE_BCH_SPOT_PRICE_FAIL,
  SET_FIAT_CURRENCY
} from "./constants";
import { FullState } from "../store";
import { bchjs } from "../../utils/bch-js-utils";
import { currencyOptions } from "../../utils/currency-utils";

const setFiatCurrency = (currencyCode: string) => ({
  type: SET_FIAT_CURRENCY,
  payload: currencyCode
});

const updateSpotPriceStart = () => ({
  type: UPDATE_BCH_SPOT_PRICE_START,
  payload: null
});

const updateSpotPriceSuccess = (
  currencyCode: CurrencyCode,
  rate: number,
  timestamp: number
) => ({
  type: UPDATE_BCH_SPOT_PRICE_SUCCESS,
  payload: {
    currency: currencyCode,
    rate,
    timestamp
  }
});

const updateSpotPriceFail = (
  currencyCode: CurrencyCode,
  timestamp: number
) => ({
  type: UPDATE_BCH_SPOT_PRICE_FAIL,
  payload: {
    currency: currencyCode,
    timestamp
  }
});

// For now assume BCH
const updateSpotPrice = (currencyCode: CurrencyCode) => {
  return async (
    dispatch: ThunkDispatch<FullState, null, AnyAction>,
    getState: () => FullState
  ) => {
    dispatch(updateSpotPriceStart());
    try {
      const now = +new Date();
      const rates = await bchjs.Price.rates();
      let whitelistRates = {};
      currencyOptions.forEach(i => {
        const roundingPrice = parseInt(rates[i]).toFixed(currencyDecimalMap[i]);
        whitelistRates[i] = roundingPrice;
      });

      for (let key in whitelistRates) {
        dispatch(updateSpotPriceSuccess(key, whitelistRates[key], now));
      }
    } catch {
      const now = +new Date();
      dispatch(updateSpotPriceFail(currencyCode, now));
    }
  };
};

export {
  updateSpotPrice,
  updateSpotPriceSuccess,
  updateSpotPriceStart,
  updateSpotPriceFail,
  setFiatCurrency
};
