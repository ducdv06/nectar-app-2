// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import OrderFailedScreen from './screens/OrderFailedScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import TabNavigator from './navigation/TabNavigator';
import BeverageScreen from './screens/BeverageScreen';
import SearchScreen from './screens/SearchScreen';
import ProductDetailScreen from './screens/ProductDetail';
import OrdersScreen from './screens/OrdersScreen';           // Thêm import
import OrderHistoryScreen from './screens/OrderHistoryScreen'; // Thêm import

import { getUser } from './services/storageService';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await getUser();
      setIsLoggedIn(!!user);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MainApp" component={TabNavigator} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
            <Stack.Screen name="OrderFailed" component={OrderFailedScreen} />
            <Stack.Screen name="Beverage" component={BeverageScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            {/* Thêm 2 màn hình mới */}
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainApp" component={TabNavigator} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
            <Stack.Screen name="OrderFailed" component={OrderFailedScreen} />
            <Stack.Screen name="Beverage" component={BeverageScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            {/* Thêm 2 màn hình mới */}
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}