import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ProductDetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Image source={require("../assets/apple.png")} style={{ width: 200, height: 200 }}/>

      <Text style={{ fontSize: 20 }}>Apple</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={{ backgroundColor: "green", padding: 15, marginTop: 20 }}
      >
        <Text style={{ color: "#fff" }}>Add to Cart</Text>
      </TouchableOpacity>

    </View>
  );
}