import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import BeverageScreen from "./screens/BeverageScreen";
import ProductDetail from "./screens/ProductDetail";
import SearchScreen from "./screens/SearchScreen";
import CartScreen from "./screens/CartScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import AccountScreen from "./screens/AccountScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import ErrorScreen from "./screens/ErrorScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// ================= SHOP STACK =================
function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={ProductDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


// ================= EXPLORE STACK =================
function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExploreMain" component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Beverages" component={BeverageScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Error" component={ErrorScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


// ================= CART STACK =================
function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartMain" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}


// ================= APP =================
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",

          // nền tab
          tabBarStyle: {
            height: 65,
            backgroundColor: "white",
            borderTopWidth: 0,
          },

          // ✅ GẠCH NGANG DƯỚI TOÀN TAB
          tabBarBackground: () => {
            let left = "0%";

            if (route.name === "Shop") left = "0%";
            else if (route.name === "Explore") left = "20%";
            else if (route.name === "Cart") left = "40%";
            else if (route.name === "Favourite") left = "60%";
            else if (route.name === "Account") left = "80%";

            return (
              <View style={{ flex: 1 }}>
                {/* nền */}
                <View style={{ flex: 1, backgroundColor: "white" }} />

                {/* thanh chạy */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: left,
                    width: "20%",
                    height: 3,
                    backgroundColor: "green",
                  }}
                />
              </View>
            );
          },

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
        <Tab.Screen name="Cart" component={CartStack} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}