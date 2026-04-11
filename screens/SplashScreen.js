// screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 5000); // 5 giây
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/splash.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  logo: {
    width: 200,
    height: 120,
    resizeMode: "contain",
  },
});