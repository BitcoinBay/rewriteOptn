import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationScreenProps } from "react-navigation";

import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { FullState } from "../data/store";
import { toggleNetwork } from "../data/networks/actions"
import { currentNetworkSelector } from "../data/networks/selectors"
import {
  NetworkCode,
  networkOptions,
  networkNameMap
} from "../utils/network-utils";

import { T, Button, Spacer } from "../atoms";

const ScreenWrapper = styled(View)`
  height: 100%;
  margin: 0 16px;
`;

const ActiveSection = styled(View)`
  padding: 0 16px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => props.theme.fg500};
`;

const RowContainer = styled(TouchableOpacity)`
  padding: 0 16px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => props.theme.fg500};
`;
const RowTextContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type PropsNetworkRow = {
  text: string;
  onPress(): void;
  isActive: boolean;
};

const NetworkRow = ({ text, onPress, isActive }: PropsNetworkRow) => (
  <RowContainer onPress={onPress}>
    <Spacer small />
    <RowTextContainer>
      <T type={isActive ? "primary" : undefined}>{text}</T>
      {isActive && (
        <T type="primary">
          <Ionicons name="ios-checkmark-circle" size={18} />
        </T>
      )}
    </RowTextContainer>
    <Spacer small />
  </RowContainer>
);

type PropsFromParent = NavigationScreenProps & {};

const mapStateToProps = (state: FullState) => {
  return {
    networkActive: currentNetworkSelector(state)
  };
};

const mapDispatchToProps = {
  toggleNetwork
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromParent & PropsFromRedux;

const SelectNetworkScreen = ({
  navigation,
  networkActive,
  toggleNetwork
}: Props) => {
  const updateNetwork = (network: NetworkCode) => {
    toggleNetwork(network);
  };

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <ActiveSection>
          <Spacer />
          <T center>Active Network:</T>
          <Spacer tiny />
          <T center weight="bold">
            {`${networkNameMap[networkActive]} `}
          </T>
          <Spacer />
        </ActiveSection>
        <ScrollView>
          {networkOptions.map((networkCode: NetworkCode) => {
            return (
              <NetworkRow
                key={networkCode}
                text={`${networkCode} - ${networkNameMap[networkCode]}`}
                onPress={() => toggleNetwork(networkCode)}
                isActive={networkActive === networkCode}
              />
            );
          })}
          <Spacer />
        </ScrollView>
        <Spacer small />
        <Button 
          onPress={() => navigation.goBack()} 
          text="Accept" />
        <Spacer small />
      </ScreenWrapper>
    </SafeAreaView>
  );
};

export default connector(SelectNetworkScreen);
