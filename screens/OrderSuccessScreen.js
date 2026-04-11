// screens/OrderSuccessScreen.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function OrderSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/happy.png")} style={styles.image} />

      <Text style={styles.title}>Your Order has been accepted</Text>
      <Text style={styles.subText}>
        Your items has been placed and is on its way to being processed
      </Text>

      <TouchableOpacity
        style={styles.trackBtn}
        onPress={() => navigation.replace("MainApp")}
      >
        <Text style={styles.trackText}>Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("MainApp")}>
        <Text style={styles.backText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  trackBtn: {
    backgroundColor: "green",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  trackText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});