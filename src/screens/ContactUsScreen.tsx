import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { H2, T, Spacer, Button } from "../atoms";

const ScreenWrapper = styled(ScrollView)`
  padding: 7px 16px;
`;

type Props = StackNavigationProp & {};

const ContactUsScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}>
      <ScreenWrapper
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Spacer small />
        <H2 center> Contact Us</H2>
        <Spacer small />
        <T center>We hope you are enjoying OPTN Wallet</T>
        <Spacer small />
        <T center>
          If you wish to give feedback, ask a question, or contact us for
          another reason, get in touch with the team through electronic mail or
          Telegram
        </T>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("mailto:info@bitcoinbay.ca?subject=OPTN Wallet")
          }>
          <Spacer large />
          <T center>
            <Ionicons name="ios-mail" size={22} /> Email
          </T>
          <Spacer tiny />
          <T center size="large">
            info@bitcoinbay.ca
          </T>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://t.me/joinchat/Ig0qehn6gq215dzUKMp2xg")
          }>
          <Spacer />
          <T center>
            <FontAwesome name="telegram" size={22} /> Telegram
          </T>
          <Spacer tiny />
          <T center size="large">
            OPTN Wallet Telegram
          </T>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://github.com/BitcoinBay/OPTN-Wallet")
          }>
          <Spacer />
          <T center>
            <FontAwesome name="github" size={22} /> Github
          </T>
          <Spacer tiny />
          <T center size="large">
            OPTN Github Page
          </T>
        </TouchableOpacity>
        <Spacer fill />
        <Button onPress={() => navigation.goBack()} text="Back" />
        <Spacer small />
      </ScreenWrapper>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
