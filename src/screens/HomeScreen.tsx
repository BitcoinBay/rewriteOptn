import React, { useEffect, useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  SectionList,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { v5 as uuidv5 } from 'uuid';
import BigNumber from "bignumber.js";

import { T, H1, Spacer, Button } from "../atoms";

import { CoinRowHeader, CoinRow } from "../components";

import { FullState } from "../data/store";
import { balancesSelector } from "../data/selectors";
import {
  getAddressSelector,
  getAddressSlpSelector,
  getSeedViewedSelector
} from "../data/accounts/selectors";
import { tokensByIdSelector } from "../data/tokens/selectors";
import { spotPricesSelector, currencySelector } from "../data/prices/selectors";
import { tokenFavoritesSelector } from "../data/settings/selectors";

import { updateUtxos } from "../data/utxos/actions";
import { updateTokensMeta } from "../data/tokens/actions";
import { updateSpotPrice } from "../data/prices/actions";

import {
  formatAmount,
  formatFiatAmount,
  computeFiatAmount
} from "../utils/balance-utils";

import { currencySymbolMap } from "../utils/currency-utils";
import OPTNWelcome1 from "../assets/images/OPTNWelcome1.png";
import { addressToSlp } from "../utils/account-utils";

const SECOND = 1000;

// Same as the Badger namespace for now.  doesn't need to be unique here.
const HASH_UUID_NAMESPACE = "9fcd327c-41df-412f-ba45-3cc90970e680";

const BackupNotice = styled(TouchableOpacity)`
  border-color: ${props => props.theme.accent500};
  border-width: ${StyleSheet.hairlineWidth}px;
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => props.theme.accent900};
  margin: 8px 16px;
`;

const NoTokensRow = styled(View)`
  padding: 10px 16px;
`;

const NoTokensFound = () => (
  <NoTokensRow>
    <T size="small" type="muted2">
      No SLP tokens in the vault yet
    </T>
  </NoTokensRow>
);

type PropsFromParent = StackNavigationProp & {};

// Redux connection
const mapStateToProps = (state: FullState) => {
  const address = getAddressSelector(state);
  const addressSlp = getAddressSlpSelector(state);
  const balances = balancesSelector(state, address);
  const tokensById = tokensByIdSelector(state);
  const spotPrices = spotPricesSelector(state);
  const seedViewed = getSeedViewedSelector(state);
  const fiatCurrency = currencySelector(state);
  const tokenFavorites = tokenFavoritesSelector(state);

  return {
    address,
    addressSlp,
    balances,
    spotPrices,
    seedViewed,
    fiatCurrency,
    tokensById,
    tokenFavorites,
  }
};

const mapDispatchToProps = {
  updateSpotPrice,
  updateTokensMeta,
  updateUtxos,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsFromParent;

interface WalletSection {
  title: string;
  data: {
    symbol: string;
    name: string;
    amount: string;
    tokenId?: string;
    valueDisplay?: string;
  }[];
}

const HomeScreen = ({
  navigation,
  address,
  addressSlp,
  balances,
  seedViewed,
  spotPrices,
  fiatCurrency,
  tokensById,
  updateSpotPrice,
  updateTokensMeta,
  updateUtxos,
  tokenFavorites,
}: Props) => {
  useEffect(() => {
    if (!address) return;
    updateUtxos(address, address);
    const utxoInterval = setInterval(
      () => updateUtxos(address, addressSlp), 
      // Fullstack.cash rate limit set defaults at 3 requests per minute
      60 * SECOND
    );
    return () => {
      clearInterval(utxoInterval);
    };
  }, [address, addressSlp, updateUtxos]);

  const tokenIds = Object.keys(balances.slpTokens);
  const tokenIdsHash = uuidv5(tokenIds.join(""), HASH_UUID_NAMESPACE);

  useEffect(() => {
    // Fetch token metadata if any are missing
    const missingTokenIds = tokenIds.filter(tokenId => !tokensById[tokenId]);
    updateTokensMeta(missingTokenIds);
  }, [tokenIdsHash]);

  useEffect(() => {
    // Update the BCH price on an interval
    updateSpotPrice(fiatCurrency);
    const spotPriceInterval = setInterval(
      () => updateSpotPrice(fiatCurrency),
      60 * SECOND
    );
    return () => clearInterval(spotPriceInterval);
  }, [navigation, fiatCurrency, updateSpotPrice]);

  const BCHFiatDisplay = useMemo(() => {
    const BCHFiatAmount = computeFiatAmount(
      balances.satoshisAvailable,
      spotPrices,
      fiatCurrency,
      "bch"
    );

    return formatFiatAmount(BCHFiatAmount, fiatCurrency, "bch");
  }, [balances.satoshisAvailable, fiatCurrency, spotPrices]);

  const tokenData = useMemo(() => {
    const slpTokensDisplay = Object.keys(balances.slpTokens).map<
      [string, BigNumber]
    >(key => [key, balances.slpTokens[key]]);

    const tokensWithBalance = slpTokensDisplay.filter(
      ([tokenId, amount]) => amount.toNumber() !== 0
    );
    const tokensFormatted = tokensWithBalance.map(([tokenId, amount]) => {
      const token = tokensById[tokenId];
      const symbol = token ? token.symbol : "---";
      const name = token ? token.name : "--------";
      const decimals = token ? token.decimals : null;
      const amountFormatted = formatAmount(amount, decimals);

      return {
        symbol,
        name,
        amount: amountFormatted,
        tokenId
      };
    });

    const tokensSorted = tokensFormatted.sort((a, b) => {
      const symbolA = a.symbol.toUpperCase();
      const symbolB = b.symbol.toUpperCase();
      if (symbolA < symbolB) return -1;
      if (symbolA > symbolB) return 1;
      return 0;
    });
    return tokensSorted;
  }, [balances.slpTokens, tokensById]);

  const favoriteTokensSection: WalletSection | null = useMemo(() => {
    const filteredTokens = tokenData.filter(
      data => tokenFavorites && tokenFavorites.includes(data.tokenId)
    );

    return filteredTokens.length
      ? {
          title: "SLP Tokens - Favorites",
          data: filteredTokens
        }
      : null;
  }, [tokenData, tokenFavorites]);

  const tokensSection: WalletSection = useMemo(() => {
    const favoriteTokens = tokenData.filter(data =>
      tokenFavorites ? !tokenFavorites.includes(data.tokenId) : true
    );
    return {
      title: "SLP Tokens",
      data: favoriteTokens
    };
  }, [tokenData, tokenFavorites]);

  const walletSections: WalletSection[] = useMemo(() => {
    const sectionBCH: WalletSection = {
      title: "Bitcoin Cash Wallet",
      data: [
        {
          symbol: "BCH",
          name: "Bitcoin Cash",
          // amount: "1337.42069",
          amount: formatAmount(balances.satoshisAvailable, 8),
          valueDisplay: BCHFiatDisplay
        }
      ]
    };

    return [sectionBCH, favoriteTokensSection, tokensSection].filter(
      Boolean
    ) as WalletSection[];
  }, [
    BCHFiatDisplay,
    balances.satoshisAvailable,
    favoriteTokensSection,
    tokensSection
  ]);

  return (
    <SafeAreaView>
      <View
        style={{
          height: "100%",
          alignItems: "stretch"
        }}
      >
        <ScrollView
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            flexGrow: 1
          }}
        >
          {!seedViewed ? (
            <>
              <BackupNotice
                onPress={() => navigation.navigate("ViewSeedScreen")}
              >
                <T center size="small" type="accent">
                  Please backup your Seed Phrase
                </T>
              </BackupNotice>
              <Spacer small />
            </>
          ) : (
            <Spacer large />
          )}
          <Image
            source={OPTNWelcome1}
            style={{
              width: 350,
              height: 150,
              resizeMode: "contain",
              alignItems: "center"
            }}
          />
          <View 
            style={{
              position: "relative"
            }}
          >
            <T center>
              Current Price
            </T>
            <H1 center>
              {/* {`${currencySymbolMap[fiatCurrency]} ${spotPrices["bch"][fiatCurrency]["rate"]} ${fiatCurrency} / BCH`} */}
            </H1>
            <Spacer />
            <SectionList 
              sections={walletSections}
              renderSectionHeader={({ section }) => (
                <CoinRowHeader>{section.title}</CoinRowHeader>
              )}
              renderSectionFooter={({ section }) =>
                !section.data.length ? <NoTokensFound /> : null
              }
              renderItem={({ item }) =>
                item && (
                  <CoinRow
                    amount={item.amount}
                    name={item.name}
                    ticker={item.symbol}
                    tokenId={item.tokenId}
                    valueDisplay={item.valueDisplay}
                    onPress={() =>
                      console.log("hi")
                      // navigation.navigate("WalletDetailScreen", {
                      //   symbol: item.symbol,
                      //   tokenId: item.tokenId
                      // })
                    }
                  />
                )
              }
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default connector(HomeScreen);
