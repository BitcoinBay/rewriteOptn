import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import LogoutScreen from "../screens/LogoutScreen";
import ReceiveScreen from "../screens/ReceiveScreen";
import TermsOfUseScreen from "../screens/TermsOfUseScreen";
import ViewSeedScreen from "../screens/ViewSeedScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import FAQScreen from "../screens/FAQScreen";
import PrivacyNoticeScreen from "../screens/PrivacyNoticeScreen";
import SelectCurrencyScreen from "../screens/SelectCurrencyScreen";
import SelectNetworkScreen from "../screens/SelectNetworkScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const ReceiveStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen" headerMode="none">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const MenuStackScreens = () => {
  return (
    <MenuStack.Navigator initialRouteName="MenuScreen" headerMode="none">
      <MenuStack.Screen name="MenuScreen" component={MenuScreen} />
      <MenuStack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} />
      <MenuStack.Screen
        name="SelectCurrencyScreen"
        component={SelectCurrencyScreen}
      />
      <MenuStack.Screen
        name="SelectNetworkScreen"
        component={SelectNetworkScreen}
      />
      <MenuStack.Screen name="LogoutScreen" component={LogoutScreen} />
      <MenuStack.Screen name="ViewSeedScreen" component={ViewSeedScreen} />
      <MenuStack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <MenuStack.Screen name="FAQScreen" component={FAQScreen} />
      <MenuStack.Screen
        name="PrivacyNoticeScreen"
        component={PrivacyNoticeScreen}
      />
    </MenuStack.Navigator>
  );
};

const ReceiveStackScreens = () => {
  return (
    <ReceiveStack.Navigator initialRouteName="ReceiveScreen" headerMode="none">
      <ReceiveStack.Screen name="ReceiveScreen" component={ReceiveScreen} />
    </ReceiveStack.Navigator>
  );
};

const MainAppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      headerMode="none"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Receive") {
            iconName = focused ? "download" : "download-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Home" component={HomeStackScreens} />
      <Tab.Screen name="Receive" component={ReceiveStackScreens} />
      <Tab.Screen name="Menu" component={MenuStackScreens} />
    </Tab.Navigator>
  );
};

const DrawerScreenStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainAppStack" component={MainAppStack} />
    </Drawer.Navigator>
  );
};

export default DrawerScreenStack;
