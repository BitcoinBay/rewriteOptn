import React, { useState, useEffect, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Clipboard,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styled, { css } from "styled-components";
import QRCode from "react-native-qrcode-svg";

import {
  getAddressSelector,
  getAddressSlpSelector,
} from "../data/accounts/selectors";
import { addressToSlp } from "../utils/account-utils";

import { FullState } from "../data/store";

import { T, H1, H2, Spacer, Button } from "../atoms";
import OPTNWelcome1 from "../assets/images/OPTNWelcome1.png";
import BitcoinCashImage from "../assets/images/icon.png";
import SLPImage from "../assets/images/slp-logo.png";

const ToggleRow = styled(View)`
  justify-content: center;
  flex-direction: row;
`;

const ToggleBase = css<{ isActive: boolean }>`
  height: 42px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${(props) => props.theme.primary500};
  ${(props) =>
    props.isActive &&
    css`
      background-color: ${props.theme.primary500};
    `}
`;

const ToggleRight = styled(TouchableOpacity)`
  ${ToggleBase};
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
`;
const ToggleMiddle = styled(TouchableOpacity)`
  ${ToggleBase};
  border-left-width: 0px;
  border-right-width: 0px;
`;
const ToggleLeft = styled(TouchableOpacity)`
  ${ToggleBase};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`;

const QRHolder = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  overflow: hidden;
  position: relative;
`;

const QRPadding = (Dimensions.get("window").width * 0.35) / 2 - 10;
const HScrollableQRHolder = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 0 ${QRPadding}px 10px ${QRPadding}px;
  overflow: hidden;
  position: relative;
`;

const TypeOverlay = styled(View)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const TypeImage = styled(Image)<{ size: number }>`
  height: ${(props) => props.size * 0.15}px;
  width: ${(props) => props.size * 0.15}px;
  border-radius: ${(props) => props.size * 0.075}px;
  border-width: 3px;
  border-color: ${(props) => props.theme.bg900};
`;

const QROverlay = styled(View)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: white;
  align-items: center;
  justify-content: center;
  opacity: 0.98;
  z-index: 3;
`;

type PropsFromParent = StackNavigationProp & {};

const mapStateToProps = (state: FullState) => ({
  address: getAddressSelector(state),
  addressSlp: getAddressSlpSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromParent & PropsFromRedux;

const ReceiveScreen = ({ address, addressSlp }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const [showing, setShowing] = useState("BCH");
  const [copyNotify, setCopyNotify] = useState("");

  const [simpleLedgerAddr, setSimpleLedgerAddr] = useState(addressSlp);

  const QRSize = Dimensions.get("window").width * 0.65;

  useEffect(() => {
    const convertAddress = async () => {
      const convertedAddress = await addressToSlp(addressSlp);
      setSimpleLedgerAddr(convertedAddress);
    };

    if (!addressSlp) return;
    convertAddress();
  }, [addressSlp]);

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          padding: 10,
        }}
        ref={scrollRef}>
        <Image
          source={OPTNWelcome1}
          style={{
            width: 350,
            height: 150,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
        <T center>
          Scan a public key below to receive funds. Tap on a QR code to copy the
          address.
        </T>
        <Spacer />
        <ToggleRow>
          <ToggleLeft
            isActive={showing === "BCH"}
            onPress={() => {
              setShowing("BCH");
              setCopyNotify("");
            }}>
            <T weight="bold" type={showing === "BCH" ? "inverse" : "primary"}>
              BCH
            </T>
          </ToggleLeft>
          <ToggleMiddle
            isActive={showing === "SLP"}
            onPress={() => {
              setShowing("SLP");
              setCopyNotify("");
            }}>
            <T weight="bold" type={showing === "SLP" ? "inverse" : "primary"}>
              SLP
            </T>
          </ToggleMiddle>
          <ToggleRight
            isActive={showing === "P2SH"}
            onPress={() => {
              setShowing("P2SH");
              setCopyNotify("");
            }}>
            <T weight="bold" type={showing === "P2SH" ? "inverse" : "primary"}>
              P2SH
            </T>
          </ToggleRight>
        </ToggleRow>
        <Spacer />
        {showing === "BCH" && (
          <>
            <H2 center>Bitcoin Cash (BCH)</H2>
            <Spacer tiny />
            <TouchableOpacity
              onPress={() => {
                if (showing === "BCH") {
                  Clipboard.setString(address);
                  setCopyNotify("BCH");
                }
              }}>
              <T size="xsmall" center>
                {address ? `${address}-test` : " "}
              </T>
              <Spacer tiny />
              {address ? (
                <QRHolder>
                  <QRCode
                    value={address}
                    size={QRSize}
                    color="black"
                    backgroundColor="white"
                  />
                  <TypeOverlay>
                    <TypeImage source={BitcoinCashImage} size={QRSize} />
                  </TypeOverlay>
                  {showing !== "BCH" && (
                    <QROverlay>
                      <T>Tap to show</T>
                    </QROverlay>
                  )}
                </QRHolder>
              ) : null}
            </TouchableOpacity>
            <Spacer tiny />
            <T center size="small" type="primary">
              {copyNotify === "BCH" ? "Copied BCH Address" : " "}
            </T>
          </>
        )}
        {showing === "SLP" && (
          <>
            <H2 center>SimpleLedger Protocol (SLP)</H2>
            <Spacer tiny />
            <TouchableOpacity
              onPress={() => {
                if (showing === "SLP") {
                  Clipboard.setString(simpleLedgerAddr);
                  setCopyNotify("SLP");
                }
              }}>
              <T size="xsmall" center>
                {simpleLedgerAddr ? simpleLedgerAddr : " "}
              </T>
              <Spacer tiny />
              {simpleLedgerAddr ? (
                <QRHolder>
                  <QRCode
                    value={simpleLedgerAddr}
                    size={QRSize}
                    color="black"
                    backgroundColor="white"
                  />
                  <TypeOverlay>
                    <TypeImage source={SLPImage} size={QRSize} />
                  </TypeOverlay>
                  {showing !== "SLP" && (
                    <QROverlay>
                      <T>Tap to show</T>
                    </QROverlay>
                  )}
                </QRHolder>
              ) : null}
            </TouchableOpacity>
            <Spacer tiny />
            <T center size="small" type="primary">
              {copyNotify === "SLP" ? "Copied SLP Address" : " "}
            </T>
          </>
        )}
        {showing === "P2SH" && (
          <>
            <H2 center>Pay-to-Script-Hash (P2SH)</H2>
            <Spacer tiny />
            <TouchableOpacity
              onPress={() => {
                if (showing === "P2SH") {
                  Clipboard.setString(address);
                  setCopyNotify("P2SH");
                }
              }}>
              <T size="xsmall" center>
                bitcoincash:
              </T>
              <T size="xsmall" center>
                {address ? address.split(":")[1] : " "}
              </T>
              <Spacer tiny />
              <T center>P2SH Address Conditional Rendering & QR Code</T>
            </TouchableOpacity>
            <Spacer tiny />
            <T center size="small" type="primary">
              {copyNotify === "P2SH" ? "Copied P2SH Address" : " "}
            </T>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default connector(ReceiveScreen);
