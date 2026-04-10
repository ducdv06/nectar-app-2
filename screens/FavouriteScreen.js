import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FavouriteScreen() {
  const navigation = useNavigation();

  const [showError, setShowError] = useState(false);

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

  const renderFavouriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favouriteItem}
      onPress={() =>
        navigation.navigate("Shop", {
          screen: "Detail",
          params: { item },
        })
      }
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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Favourites</Text>
      </View>

      {/* LIST */}
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
          <Text style={styles.emptySubText}>
            Add items to favourites by tapping the heart icon
          </Text>
        </View>
      )}

      {/* ADD ALL BUTTON */}
      {favourites.length > 0 && (
        <TouchableOpacity
          style={styles.addAllBtn}
          onPress={() => setShowError(true)}
        >
          <Text style={styles.addAllText}>Add all to cart</Text>
        </TouchableOpacity>
      )}

      {/* ================= ERROR MODAL ================= */}
      {showError && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* CLOSE */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowError(false)}
            >
              <Text style={{ fontSize: 20 }}>✕</Text>
            </TouchableOpacity>

            {/* IMAGE */}
            <Image
              source={require("../assets/tui.png")}
              style={styles.errorImage}
            />

            {/* TEXT */}
            <Text style={styles.errorTitle}>Oops! Order Failed</Text>
            <Text style={styles.errorDesc}>
              Something went tembly wrong.
            </Text>

            {/* TRY AGAIN */}
            <TouchableOpacity
              style={styles.tryBtn}
              onPress={() => setShowError(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Please try again
              </Text>
            </TouchableOpacity>

            {/* BACK */}
            <TouchableOpacity onPress={() => setShowError(false)}>
              <Text style={styles.backText}>Back to home</Text>
            </TouchableOpacity>
          </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },

  favouritesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  favouriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  separator: {
    height: 1,
    backgroundColor: "#eee",
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
  },

  itemCategory: {
    color: "#666",
  },

  itemDesc: {
    color: "#999",
    fontSize: 12,
  },

  itemRight: {
    alignItems: "flex-end",
  },

  itemPrice: {
    fontWeight: "bold",
    color: "green",
  },

  /* ADD ALL BUTTON */
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

  addAllText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  /* ===== MODAL ===== */
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    top: "10%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    left: 10,
  },

  errorImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 15,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  errorDesc: {
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },

  tryBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },

  backText: {
    color: "green",
    fontWeight: "bold",
  },
});