import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import BeverageScreen from "./screens/BeverageScreen";
import ProductDetail from "./screens/ProductDetail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// STACK HOME
function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

// STACK EXPLORE (để mở beverages)
function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExploreMain" component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Beverages" component={BeverageScreen} />
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

          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === "Shop") icon = "home-outline";
            else if (route.name === "Explore") icon = "search-outline";
            else if (route.name === "Cart") icon = "cart-outline";
            else if (route.name === "Favourite") icon = "heart-outline";
            else if (route.name === "Account") icon = "person-outline";

            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Cart" component={BeverageScreen} />
        <Tab.Screen name="Favourite" component={BeverageScreen} />
        <Tab.Screen name="Account" component={BeverageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}