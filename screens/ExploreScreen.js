import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ExploreScreen() {
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      name: "Fresh Fruits & Vegetable",
      image: require("../assets/frash_fruits_vegetable.png"),
      bg: "#dff5e1",
      border: "#8fd19e",
    },
    {
      id: 2,
      name: "Cooking Oil & Ghee",
      image: require("../assets/cooking_oil.png"),
      bg: "#fff0cc",
      border: "#f2c94c",
    },
    {
      id: 3,
      name: "Meat & Fish",
      image: require("../assets/meat_fish.png"),
      bg: "#e0e7ff",
      border: "#7b9cff",
    },
    {
      id: 4,
      name: "Bakery & Snacks",
      image: require("../assets/snack.png"),
      bg: "#ffe0ec",
      border: "#ff7aa2",
    },
    {
      id: 5,
      name: "Dairy & Eggs",
      image: require("../assets/egg_milk.png"),
      bg: "#fff7cc",
      border: "#e6c84f",
    },
    {
      id: 6,
      name: "Beverages",
      image: require("../assets/beverages.png"),
      bg: "#e6f0ff",
      border: "#7da6ff",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.box,
        {
          backgroundColor: item.bg,
          borderColor: item.border,
        },
      ]}
      onPress={() => {
        if (item.name === "Beverages") {
          navigation.navigate("Beverages");
        }
      }}
    >
      <Image source={item.image} style={styles.img} />

      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 , marginTop: 20,}}>
      {/* TITLE */}
      <Text style={styles.title}>Find Products</Text>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Search Store"
          style={styles.input}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    margin: 15,
    padding: 7,
    borderRadius: 12,
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },

  box: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 2,
  },

  img: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  // 🔥 FIX CHUẨN TEXT CENTER
  name: {
    marginTop: 10,
    fontWeight: "600",
    textAlign: "center",   // ✅ căn giữa
    width: "100%",         // ✅ chiếm full box
    lineHeight: 18,        // ✅ đẹp khi xuống dòng
  },
});