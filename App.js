import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import BeverageScreen from "./screens/BeverageScreen";
import ProductDetail from "./screens/ProductDetail";
import SearchScreen from "./screens/SearchScreen";
import CartScreen from "./screens/CartScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import AccountScreen from "./screens/AccountScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// STACK HOME
function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// STACK EXPLORE
function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreMain"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Beverages" component={BeverageScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 65 },

          tabBarIcon: ({ focused }) => {
            let icon;

            if (route.name === "Shop") {
              icon = require("./assets/Vector1.png");
            } else if (route.name === "Explore") {
              icon = require("./assets/Vector2.png");
            } else if (route.name === "Cart") {
              icon = require("./assets/Vector3.png");
            } else if (route.name === "Favourite") {
              icon = require("./assets/Vector4.png");
            } else if (route.name === "Account") {
              icon = require("./assets/Vector5.png");
            }

            return (
              <Image
                source={icon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "green" : "gray",
                }}
                resizeMode="contain"
              />
            );
          },
        })}
      >
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}