import React, { useEffect, useMemo, useState } from "react";

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
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";

import { T, H1, Spacer, Button } from "../atoms";

import { FullState } from "../data/store";
import {
  getAddressSelector,
  getAddressSlpSelector,
  getSeedViewedSelector
} from "../data/accounts/selectors";
import { updateSpotPrice } from "../data/prices/actions";

import OPTNWelcome1 from "../assets/images/OPTNWelcome1.png";

const InitialLoadCover = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  background-color: ${props => props.theme.coverBg};
  height: 100%;
  width: 100%;
  z-index: 1;
  align-items: center;
  justify-content: center;
`;

type PropsFromParent = StackNavigationProp & {};

// Redux connection
const mapStateToProps = (state: FullState) => ({
  address: getAddressSelector(state),
  addressSlp: getAddressSlpSelector(state),
  seedViewed: getSeedViewedSelector(state)
});

const mapDispatchToProps = {
  updateSpotPrice,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsFromParent;

const HomeScreen = ({
  navigation,
  address
}: Props) => {
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
          <Spacer />
          <Image
            source={OPTNWelcome1}
            style={{
              width: 350,
              height: 150,
              resizeMode: "contain",
              alignItems: "center"
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default connector(HomeScreen);
