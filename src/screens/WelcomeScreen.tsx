import * as React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { SafeAreaView, View, Image } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import styled from "styled-components";

import { T, H1, H2, Spacer, Button } from "../atoms";

import OPTNWelcome3 from "../assets/images/OPTNWelcome3.png";

import { FullState } from "../data/store";
import { currentNetworkSelector } from "../data/networks/selectors";

type PropsFromParent = StackNavigationProp & {};

const mapStateToProps = (state: FullState) => {
  return {
    networkActive: currentNetworkSelector(state)
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromParent & PropsFromRedux;


const StyledWrapper = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0 16px;
`;

//type Props = StackNavigationProp & {};

const WelcomeScreen = ({
   navigation,
   networkActive, 
  }: Props) => {
  return (
    <StyledWrapper>
      <Spacer />
      <H1>OPTN Wallet</H1>
      <Spacer />
      <Image
        source={OPTNWelcome3}
        style={{
          width: 150,
          height: 150
        }}
      />
      <Spacer />
      <View
        style={{
          flex: 1
        }}
      >
        <H2
          style={{
            textAlign: "center"
          }}
        >
          A Fork of Badger Mobile Wallet
        </H2>
        <Spacer small />
        <T center>Bitcoin Cash (BCH) and Simple Token (SLP) wallet </T>
        <Spacer small />
        <Button
          onPress={() => navigation.navigate("SelectNetworkScreen")}
          text="Select Network"
        />
        <Spacer />
            <T center>
            Current Network: {`${networkActive} `}
            </T>
      </View>

      <View
        style={{
          flex: 1
        }}
      >
        <Button
          onPress={() => navigation.navigate("AuthStack", {
            screen: "CreateWalletScreen"
          })}
          text="New Wallet"
        />
        <Spacer small />
        <Button
          onPress={() => navigation.navigate("AuthStack", {
            screen: "RestoreWalletScreen"
          })}
          text="Restore Wallet"
        />
      </View>
    </StyledWrapper>
  );
};

export default connector(WelcomeScreen);
