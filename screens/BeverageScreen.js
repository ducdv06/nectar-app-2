// screens/BeverageScreen.js
import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../services/storageService";

export default function BeverageScreen() {
  const navigation = useNavigation();
  const [grid, setGrid] = useState(true);

  const data = [
    {
      id: 1,
      name: "Diet Coke",
      size: "355ml, Price",
      price: "1.99",
      image: require("../assets/diet_coke.png"),
    },
    {
      id: 2,
      name: "Sprite Can",
      size: "325ml, Price",
      price: "1.50",
      image: require("../assets/sprite.png"),
    },
    {
      id: 3,
      name: "Apple & Grape Juice",
      size: "2L ,Price",
      price: "15.99",
      image: require("../assets/apple_juice.png"),
    },
    {
      id: 4,
      name: "Orange Juice",
      size: "2L, Price",
      price: "15.99",
      image: require("../assets/orange_juice.png"),
    },
    {
      id: 5,
      name: "Coca Cola Can",
      size: "325ml, Price",
      price: "4.99",
      image: require("../assets/coka.png"),
    },
    {
      id: 6,
      name: "Pepsi Can",
      size: "330ml, Price",
      price: "4.99",
      image: require("../assets/pepsi.png"),
    },
  ];

  const handleAddToCart = async (item) => {
    await addToCart(item, 1);
    Alert.alert("Success", `${item.name} added to cart`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={grid ? styles.card : styles.list}
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <Image source={item.image} style={styles.img} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.size}>{item.size}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${item.price}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => handleAddToCart(item)}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Beverages</Text>
        <View style={{ width: 30 }} />
        <TouchableOpacity onPress={() => setGrid(!grid)} style={styles.optionButton}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        numColumns={grid ? 2 : 1}
        key={grid ? "grid" : "list"}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={grid ? { justifyContent: "space-between" } : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, flex: 1, padding: 15, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 17 },
  backButton: { padding: 5, zIndex: 1 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", flex: 1 },
  optionButton: { padding: 5 },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  img: { width: "100%", height: 100, resizeMode: "contain" },
  name: { fontWeight: "bold", marginTop: 5 },
  size: { color: "gray", fontSize: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  price: { fontWeight: "bold", fontSize: 16, color: "green" },
  btn: { backgroundColor: "green", width: 35, height: 35, borderRadius: 8, alignItems: "center", justifyContent: "center" },
});