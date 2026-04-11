// screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToCart } from "../services/storageService";

export default function HomeScreen() {
  const navigation = useNavigation();

  const exclusive = [
    {
      id: 1,
      name: "Organic Banana",
      price: "4.99",
      desc: "7pcs",
      image: require("../assets/banana.png"),
    },
    {
      id: 2,
      name: "Red Apple",
      price: "4.99",
      desc: "1kg",
      image: require("../assets/apple.png"),
    },
  ];

  const bestSelling = [
    {
      id: 3,
      name: "Chili",
      price: "4.99",
      desc: "1kg",
      image: require("../assets/chili.png"),
    },
    {
      id: 4,
      name: "Ginger",
      price: "4.99",
      desc: "250g",
      image: require("../assets/gung.png"),
    },
  ];

  const groceriesSlide = [
    {
      id: 5,
      name: "Pulses",
      image: require("../assets/pulses.png"),
    },
    {
      id: 6,
      name: "Rice",
      image: require("../assets/rice.png"),
    },
  ];

  const groceriesProducts = [
    {
      id: 7,
      name: "Beef Bone",
      price: "4.99",
      desc: "1kg",
      image: require("../assets/beef.png"),
    },
    {
      id: 8,
      name: "Broiler Chicken",
      price: "4.99",
      desc: "1kg",
      image: require("../assets/chicken.png"),
    },
  ];

  const handleAddToCart = async (item) => {
    await addToCart(item, 1);
    Alert.alert("Success", `${item.name} added to cart`);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => handleAddToCart(item)}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSlide = ({ item }) => (
    <TouchableOpacity style={styles.slide}>
      <Image source={item.image} style={styles.slideImg} />
      <Text style={styles.slideText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header hiển thị tên và MSSV */}
      <View style={styles.mssvHeader}>
        <Text style={styles.mssvText}>Đỗ Văn Đức - 23810310329</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image source={require("../assets/la.png")} style={styles.leaf} />
            <Image source={require("../assets/carrot.png")} style={styles.carrot} />
          </View>
          <Text style={styles.location}>Dhaka, Banassre</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color="black" />
          <TextInput placeholder="Search Store" style={styles.search} />
        </View>

        <Image source={require("../assets/banner.png")} style={styles.banner} />

        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Exclusive Offer</Text>
          <Text style={styles.more}>See all</Text>
        </View>

        <FlatList
          data={exclusive}
          horizontal
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Best Selling</Text>
          <Text style={styles.more}>See all</Text>
        </View>

        <FlatList
          data={bestSelling}
          horizontal
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Groceries</Text>
          <Text style={styles.more}>See all</Text>
        </View>

        <FlatList
          data={groceriesSlide}
          horizontal
          renderItem={renderSlide}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 15 }}
        />

        <FlatList
          data={groceriesProducts}
          horizontal
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Header MSSV mới thêm
  mssvHeader: {
    backgroundColor: "green",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  mssvText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Các style cũ giữ nguyên
  container: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  logoWrapper: {
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  leaf: {
    position: "absolute",
    top: -3,
    left: 44,
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
  carrot: {
    width: 20,
    height: 30,
    resizeMode: "contain",
  },
  location: {
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  search: {
    flex: 1,
    padding: 10,
  },
  banner: {
    width: "100%",
    height: 120,
    borderRadius: 15,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  more: {
    color: "green",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    width: 160,
    height: 200,
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: 90,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
    marginTop: 8,
  },
  desc: {
    color: "gray",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    marginTop: 4,
  },
  btn: {
    backgroundColor: "green",
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 35,
    height: 35,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    backgroundColor: "#dff5e1",
    padding: 15,
    borderRadius: 20,
    marginRight: 15,
    width: 200,
    alignItems: "center",
  },
  slideImg: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  slideText: {
    marginTop: 5,
    fontWeight: "bold",
  },
});