// screens/FavouriteScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../services/storageService";

export default function FavouriteScreen() {
  const navigation = useNavigation();

  const [favourites, setFavourites] = useState([
    {
      id: 1,
      name: "Organic Banana",
      price: 4.99,
      image: require("../assets/banana.png"),
      category: "Fresh Fruits",
      desc: "7pcs",
    },
    {
      id: 2,
      name: "Red Apple",
      price: 4.99,
      image: require("../assets/apple.png"),
      category: "Fresh Fruits",
      desc: "1kg",
    },
    {
      id: 3,
      name: "Diet Coke",
      price: 1.99,
      image: require("../assets/diet_coke.png"),
      category: "Beverages",
      desc: "355ml",
    },
    {
      id: 4,
      name: "Broiler Chicken",
      price: 8.99,
      image: require("../assets/chicken.png"),
      category: "Meat",
      desc: "1kg",
    },
  ]);

  const handleAddAllToCart = async () => {
    try {
      for (const item of favourites) {
        const productToAdd = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          desc: item.desc,
          category: item.category,
        };
        await addToCart(productToAdd, 1);
      }
      
      Alert.alert(
        "Success",
        `Added ${favourites.length} items to cart!`,
        [
          { 
            text: "View Cart", 
            onPress: () => navigation.navigate("Cart")
          },
          { 
            text: "Continue", 
            style: "cancel" 
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to add items to cart");
    }
  };

  const handleAddSingleToCart = async (item) => {
    try {
      const productToAdd = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        desc: item.desc,
        category: item.category,
      };
      await addToCart(productToAdd, 1);
      Alert.alert("Success", `${item.name} added to cart`);
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart");
    }
  };

  const renderFavouriteItem = ({ item }) => (
    <View style={styles.favouriteItem}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.navigate("ProductDetail", { item })}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemDesc}>{item.desc}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.addSingleBtn}
        onPress={() => handleAddSingleToCart(item)}
      >
        <Text style={styles.addSingleBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favourites</Text>
      </View>

      <FlatList
        data={favourites}
        renderItem={renderFavouriteItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.favouritesList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity style={styles.addAllBtn} onPress={handleAddAllToCart}>
        <Text style={styles.addAllText}>Add all to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { position: "absolute", left: 20, top: 50 },
  headerTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", flex: 1 },
  favouritesList: { paddingHorizontal: 20, paddingBottom: 100 },
  favouriteItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  separator: { height: 1, backgroundColor: "#eee" },
  itemImage: { width: 80, height: 80, resizeMode: "contain", marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemCategory: { color: "#666", fontSize: 13 },
  itemDesc: { color: "#999", fontSize: 12 },
  itemPrice: { fontWeight: "bold", color: "green", marginTop: 4 },
  addSingleBtn: {
    backgroundColor: "green",
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  addSingleBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addAllBtn: {
    position: "absolute",
    bottom: 20,
    left: 50,
    right: 50,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  addAllText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});