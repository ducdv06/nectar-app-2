import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ExploreScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Dữ liệu categories
  const categoriesData = [
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

  // Filter options
  const filterCategories = ["Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"];
  const filterBrands = ["Individual Collection", "Cocola", "Ifad", "Kazi Farmas"];

  // Hàm xử lý search
  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate("Search", { query: searchText });
      setSearchText("");
    }
  };

  // Hàm toggle category filter
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Hàm toggle brand filter
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Hàm áp dụng filter
  const applyFilters = () => {
    // Lưu filters vào state hoặc context để sử dụng ở SearchScreen
    console.log("Applied filters:", { categories: selectedCategories, brands: selectedBrands });
    setIsFilterVisible(false);
  };

  // Hàm reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

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
        } else {
          // Tìm kiếm theo category
          navigation.navigate("Search", { query: item.name });
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
    <View style={{ flex: 1, marginTop: 20 }}>
      {/* TITLE */}
      <Text style={styles.title}>Find Products</Text>

      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Search Store"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* CATEGORIES LIST */}
      <FlatList
        data={categoriesData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* FILTER MODAL */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Categories Section */}
            <Text style={styles.sectionTitle}>Categories</Text>
            {filterCategories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.option}
                onPress={() => toggleCategory(cat)}
              >
                <View style={styles.checkbox}>
                  {selectedCategories.includes(cat) && (
                    <Ionicons name="checkmark" size={16} color="green" />
                  )}
                </View>
                <Text style={styles.optionText}>{cat}</Text>
              </TouchableOpacity>
            ))}

            {/* Brand Section */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Brand</Text>
            {filterBrands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={styles.option}
                onPress={() => toggleBrand(brand)}
              >
                <View style={styles.checkbox}>
                  {selectedBrands.includes(brand) && (
                    <Ionicons name="checkmark" size={16} color="green" />
                  )}
                </View>
                <Text style={styles.optionText}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  filterIcon: {
    padding: 5,
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
  name: {
    marginTop: 10,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
    lineHeight: 18,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resetText: {
    fontSize: 14,
    color: "red",
  },
  modalContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "green",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});