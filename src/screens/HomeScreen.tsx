import React, { useEffect, useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import { T, H1, Spacer, Button } from "../atoms";

import { FullState } from "../data/store";
import {
  getSeedViewedSelector
} from "../data/accounts/selectors";
import { spotPricesSelector, currencySelector } from "../data/prices/selectors";

import { updateSpotPrice } from "../data/prices/actions";

import { currencySymbolMap } from "../utils/currency-utils";
import OPTNWelcome1 from "../assets/images/OPTNWelcome1.png";

const SECOND = 1000;

// Same as the Badger namespace for now.  doesn't need to be unique here.
const HASH_UUID_NAMESPACE = "9fcd327c-41df-412f-ba45-3cc90970e680";

const BackupNotice = styled(TouchableOpacity)`
  border-color: ${props => props.theme.accent500};
  border-width: ${StyleSheet.hairlineWidth};
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
const mapStateToProps = (state: FullState) => ({
  seedViewed: getSeedViewedSelector(state),
  spotPrices: spotPricesSelector(state),
  fiatCurrency: currencySelector(state),
});

const mapDispatchToProps = {
  updateSpotPrice,
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
  seedViewed,
  spotPrices,
  fiatCurrency,
  updateSpotPrice,
}: Props) => {
  useEffect(() => {
    // Update the BCH price on an interval
    updateSpotPrice(fiatCurrency);
    const spotPriceInterval = setInterval(
      () => updateSpotPrice(fiatCurrency),
      60 * SECOND
    );
    return () => clearInterval(spotPriceInterval);
  }, [fiatCurrency, updateSpotPrice]);

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
              {`${currencySymbolMap[fiatCurrency]} ${spotPrices["bch"][fiatCurrency]["rate"]} ${fiatCurrency} / BCH`}
            </H1>
            <Spacer />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default connector(HomeScreen);
