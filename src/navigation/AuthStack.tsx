import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import TermsOfUseScreen from "../screens/TermsOfUseScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreateWalletScreen from "../screens/CreateWalletScreen";
import RestoreWalletScreen from "../screens/RestoreWalletScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen" headerMode="none">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} />
      <Stack.Screen name="CreateWalletScreen" component={CreateWalletScreen} />
      <Stack.Screen
        name="RestoreWalletScreen"
        component={RestoreWalletScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
