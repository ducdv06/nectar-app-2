import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderSuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* IMAGE */}
      <Image
        source={require("../assets/happy.png")}
        style={styles.image}
      />

      {/* TEXT */}
      <Text style={styles.title}>Your Order has been accepted</Text>

      <Text style={styles.subText}>
        Your items has been placed and is on its way to being processed
      </Text>

      {/* BUTTONS */}
      <TouchableOpacity
        style={styles.trackBtn}
        onPress={() => {
          navigation.navigate("Favourite");

          setTimeout(() => {
            navigation.navigate("Explore", {
                screen: "Error",
            });
          }, 300);
        }}
      >
        <Text style={styles.trackText}>Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Cart")}
      >
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
    marginRight: 20,
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
    marginBottom: 30,
  },

  trackBtn: {
    backgroundColor: "green",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
  },

  trackText: {
    color: "#fff",
    fontWeight: "bold",
  },

  backText: {
    color: "green",
    fontWeight: "bold",
  },
});