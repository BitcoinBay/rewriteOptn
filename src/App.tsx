import "react-native-gesture-handler";
import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { View } from "react-native";
import { PersistGate } from "redux-persist/integration/react";

import { getStore } from "./data/store";
import { spaceBadger } from "./themes/spaceBadger";

import AppNavigator from "./navigation/AppNavigator";

const { store, persistor } = getStore();

const AppWrapper = styled(View)`
  flex: 1;
`;

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={spaceBadger}>
            <AppWrapper>
              <AppNavigator />
            </AppWrapper>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
