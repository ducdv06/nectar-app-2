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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();

  // DATA
  const exclusive = [
    {
      id: 1,
      name: "Banana",
      price: "4.99",
      desc: "7pcs, Priceg",
      image: require("../assets/banana.png"),
    },
    {
      id: 2,
      name: "Apple",
      price: "4.99",
      desc: "1kg, Priceg",
      image: require("../assets/apple.png"),
    },
  ];

  const bestSelling = [
    {
      id: 3,
      name: "Chili",
      price: "4,99",
      desc: "1kg, Priceg",
      image: require("../assets/chili.png"),
    },
    {
      id: 4,
      name: "Ginger",
      price: "4,99",
      desc: "250mg, Priceg",
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
      price: "4,99",
      desc: "1kg",
      image: require("../assets/beef.png"),
    },
    {
      id: 8,
      name: "Chicken",
      price: "4,99",
      desc: "1kg",
      image: require("../assets/chicken.png"),
    },
  ];

  // CARD (🔥 CLICK)
  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <Image source={item.image} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.desc}, Price</Text>
      <Text style={styles.price}>${item.price}</Text>

      <View style={styles.btn}>
        <Text style={{ color: "#fff" }}>+</Text>
      </View>
    </TouchableOpacity>
  );

  // SLIDE
  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.slideImg} />
      <Text style={styles.slideText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
  
          <View style={styles.logoWrapper}>
            <Image
              source={require("../assets/la.png")}
              style={styles.leaf}
            />

            <Image
              source={require("../assets/carrot.png")}
              style={styles.carrot}
            />
            </View>

          <Text style={styles.location}>Dhaka, Banassre</Text>

        </View>

        {/* SEARCH */}
        <TextInput placeholder="Search Store" style={styles.search} />

        {/* BANNER */}
        <Image
          source={require("../assets/banner.png")}
          style={styles.banner}
        />

        {/* EXCLUSIVE */}
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

        {/* BEST SELLING */}
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

        {/* GROCERIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Groceries</Text>
          <Text style={styles.more}>See all</Text>
        </View>

        {/* SLIDE */}
        <FlatList
          data={groceriesSlide}
          horizontal
          renderItem={renderSlide}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 15 }}
        />

        {/* PRODUCTS */}
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
  container: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    paddingBottom: 120,
  },

  header: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 80,          // tăng kích thước
    height: 80,
    resizeMode: "contain", // 🔥 QUAN TRỌNG (không bị cắt)
  },

  leaf: {
  position: "absolute",   // 🔥 BẮT BUỘC
  top: -6,
  left: 15,                 // chỉnh lên xuống
  width: 10,
  height: 10,
  resizeMode: "contain",
},

  location: {
    fontWeight: "bold",
  },

  search: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
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
  },

  btn: {
    backgroundColor: "green",
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 35,
    height: 35,
    borderRadius: 8,
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
  },

  slideText: {
    marginTop: 5,
    fontWeight: "bold",
  },
});