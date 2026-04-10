import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import CartScreen from "../screens/CartScreen";
import BeverageScreen from "../screens/BeverageScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          height: 65,
        },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color}/> }}
      />

      <Tab.Screen name="Explore" component={ExploreScreen}
        options={{ tabBarIcon: ({color}) => <Ionicons name="search" size={24} color={color}/> }}
      />

      <Tab.Screen name="Cart" component={CartScreen}
        options={{ tabBarIcon: ({color}) => <Ionicons name="cart" size={24} color={color}/> }}
      />

      <Tab.Screen name="Beverage" component={BeverageScreen}
        options={{ tabBarIcon: ({color}) => <Ionicons name="cafe" size={24} color={color}/> }}
      />
    </Tab.Navigator>
  );
}