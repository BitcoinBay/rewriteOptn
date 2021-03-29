import React, { useEffect, useCallback } from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import { ActivityIndicator, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import { T, Spacer } from "../atoms";
import { getMnemonicSelector } from "../data/accounts/selectors";
import { getAccount } from "../data/accounts/actions";

import { FullState } from "../data/store";

const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const InnerWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

type PropsFromParent = StackNavigationProp & {};

const mapStateToProps = (state: FullState) => {
  return {
    mnemonic: getMnemonicSelector(state),
  };
};

const mapDispatchToProps = {
  getAccount
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromParent & PropsFromRedux;

const AuthLoadingScreen = ({ 
  navigation, 
  mnemonic,
  getAccount,
}: Props) => {
  // re-generate accounts keypair then go to Main.
  useEffect(() => {
    if (mnemonic) {
      getAccount(mnemonic);
      navigation.navigate("MainAppStack", {
        screen: 'Home', params: {
            screen: 'HomeScreen'
        }
      });
    } else {
      navigation.navigate("AuthStack", {
        screen: 'WelcomeScreen'
      });
    }
  }, [navigation, mnemonic, getAccount]);

  return (
    <Wrapper>
      <InnerWrapper>
        <ActivityIndicator />
        <Spacer />
        <T monospace>Loading Wallet</T>
        <T monospace>Please Wait...</T>
      </InnerWrapper>
    </Wrapper>
  );
};

export default connector(AuthLoadingScreen);
