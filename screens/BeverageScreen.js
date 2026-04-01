import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BeverageScreen() {
  const [grid, setGrid] = useState(true);

  const data = [
    {
      id: 1,
      name: "Diet Coke",
      size: "355ml",
      price: "1.99",
      image: require("../assets/diet_coke.png"),
    },
    {
      id: 2,
      name: "Sprite Can",
      size: "325ml",
      price: "1.50",
      image: require("../assets/sprite.png"),
    },
    {
      id: 3,
      name: "Apple Juice",
      size: "2L",
      price: "3.99",
      image: require("../assets/apple_juice.png"),
    },
    {
      id: 4,
      name: "Orange Juice",
      size: "2L",
      price: "3.99",
      image: require("../assets/orange_juice.png"),
    },
    {
      id: 5,
      name: "Pepsi",
      size: "330ml",
      price: "1.80",
      image: require("../assets/pepsi.png"),
    },
    {
      id: 6,
      name: "Coca Cola",
      size: "330ml",
      price: "1.80",
      image: require("../assets/coka.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={grid ? styles.card : styles.list}>
      {/* IMAGE */}
      <Image source={item.image} style={styles.img} />

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.size}>{item.size}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>${item.price}</Text>

          <View style={styles.btn}>
            <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Beverages</Text>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="options-outline" size={24} style={{ marginRight: 6}} />

        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={data}
        numColumns={grid ? 2 : 1}
        key={grid ? "grid" : "list"}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={
          grid ? { justifyContent: "space-between" } : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  search: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
  },

  // 🔥 CARD GIỐNG HOME
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,
  },

  list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },

  // 🔥 FIX ẢNH KHÔNG BỊ CẮT
  img: {
    width: "100%",
    height: 100,
    resizeMode: "contain", // 🔥 QUAN TRỌNG
  },

  name: {
    fontWeight: "bold",
    marginTop: 5,
  },

  size: {
    color: "gray",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontWeight: "bold",
  },

  // 🔥 NÚT GIỐNG HOME
  btn: {
    backgroundColor: "green",
    width: 35,
    height: 35,
    borderRadius: 8, // 🔥 KHÔNG TRÒN
    alignItems: "center",
    justifyContent: "center",
  },
});