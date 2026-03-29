import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    width: 150,
    margin: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    color: "gray",
  },
  btn: {
    backgroundColor: "green",
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});