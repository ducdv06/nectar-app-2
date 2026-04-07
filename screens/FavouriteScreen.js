import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(item => item.id !== id));
  };

  const renderFavouriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favouriteItem}
      onPress={() => navigation.navigate("Shop", {
        screen: "Detail",
        params: { item }
      })}
    >
      <Image source={item.image} style={styles.itemImage} />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemDesc}>{item.desc}</Text>
      </View>
      
      <View style={styles.itemRight}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favourites</Text>
      </View>

      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={renderFavouriteItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.favouritesList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No favourites yet</Text>
          <Text style={styles.emptySubText}>Add items to favourites by tapping the heart icon</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate("Shop")}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  clearButton: {
    padding: 5,
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
  clearText: {
    fontSize: 14,
    color: "red",
  },
  favouritesList: {
    paddingHorizontal: 20,
  },
  favouriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    width: "90%",
    alignSelf: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 12,
    color: "#999",
  },
  itemRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});