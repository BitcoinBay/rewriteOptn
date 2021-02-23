import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";

import { View, ScrollView, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import { viewSeed } from "../data/accounts/actions";
import {
  getMnemonicSelector,
  getAddressSelector
} from "../data/accounts/selectors";
import { T, Spacer, Button } from "../atoms";
import { FullState } from "../data/store";

const Screen = styled(ScrollView)`
  padding: 0 16px;
`;

const WordHolder = styled(View)`
  position: relative;
`;

const WordRow = styled(View)``;

const Cover = styled(View)`
  position: absolute;
  background-color: ${props => props.theme.coverBg};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

type PropsFromParent = StackNavigationProp & {};

const mapStateToProps = (state: FullState) => ({
  address: getAddressSelector(state),
  mnemonic: getMnemonicSelector(state)
});

const mapDispatchToProps = {
  viewSeed
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromParent & PropsFromRedux;

const ViewSeedScreen = ({ 
  navigation,
  mnemonic, 
  viewSeed, 
  address 
}: Props) => {
  const [showing, setShowing] = useState(false);

  const words = showing ? mnemonic : "---------- ".repeat(12).trim();
  const separated = words.split(" ");

  return (
    <SafeAreaView>
      <Screen>
        <Spacer />
        <T center>This seed phrase is the key to the funds in this wallet.</T>
        <Spacer small />
        <T center>
          Losing this phrase is losing access to this wallet. If lost we will be
          unable to help you recover your Seed Phrase or wallet.
        </T>
        <Spacer small />
        <T center>
          Write the 12-word seed phrase down in order, keep it safe, and do not
          share it with anyone you do not trust with access to your wallet.
        </T>
        <Spacer />
        <WordHolder>
          {!showing && (
            <Cover>
              <T center>
                I am in a private area and wish to see my seed phrase
              </T>
              <Spacer />
              <Button
                text="Reveal Seed Phrase"
                onPress={() => {
                  setShowing(true);
                  viewSeed(address);
                }}
              />
            </Cover>
          )}
          <View>
            {separated.map((word, idx) => (
              <WordRow key={idx}>
                <T>
                  <T monospace type="muted2">
                    {`${idx + 1}.`.padStart(3, " ")}
                  </T>
                  <T> {word}</T>
                </T>
                <Spacer tiny />
              </WordRow>
            ))}
          </View>
        </WordHolder>
        <Spacer />
        <Button
          onPress={() => navigation.goBack()}
          text="Back"
        />
      </Screen>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSeedScreen);
