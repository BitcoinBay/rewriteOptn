import React, { useEffect } from "react";
import styled from "styled-components";
import { SafeAreaView, ActivityIndicator, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";

import { Spacer, T } from "../atoms";
import OPTNWelcome3 from "../assets/images/OPTNWelcome3.png";

import {
  hasMnemonicSelector,
  activeAccountIdSelector,
} from "../data/accounts/selectors";
import { getAccount } from "../data/accounts/actions";
import { FullState } from "../data/store";
import { currentNetworkSelector } from "../data/networks/selectors";

const ScreenWrapper = styled(SafeAreaView)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

type PropsFromParent = StackNavigationProp & {};

// Redux connection
const mapStateToProps = (state: FullState) => ({
  accountAddress: activeAccountIdSelector(state),
  isCreated: hasMnemonicSelector(state),
  networkActive: currentNetworkSelector(state),
});

const mapDispatchToProps = {
  getAccount,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PropsFromParent;

const CreateWalletScreen = ({
  navigation,
  isCreated,
  getAccount,
  networkActive,
}: Props) => {
  useEffect(() => {
    if (isCreated) {
      navigation.navigate("MainAppStack", {
        screen: "Home",
        params: {
          screen: "HomeScreen",
        },
      });
    } else {
      getAccount(null, 0, networkActive);
    }
  }, [isCreated]);

  return (
    <ScreenWrapper>
      <Image
        source={OPTNWelcome3}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <ActivityIndicator />
      <Spacer />
      <T monospace>Loading Wallet...</T>
    </ScreenWrapper>
  );
};

export default connector(CreateWalletScreen);
