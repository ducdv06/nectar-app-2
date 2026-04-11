// screens/SearchScreen.js - Sửa phần điều hướng
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import FilterModal from "./FilterModal";
import { addToCart } from "../services/storageService";

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { query: initialQuery } = route.params || { query: "" };
  
  const [searchText, setSearchText] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ categories: [], brands: [] });

  // Dữ liệu sản phẩm
  const allProducts = [
    { id: 1, name: "Diet Coke", category: "Beverages", brand: "Cocola", price: "1.99", image: require("../assets/diet_coke.png") },
    { id: 2, name: "Sprite Can", category: "Beverages", brand: "Cocola", price: "1.50", image: require("../assets/sprite.png") },
    { id: 3, name: "Apple & Grape Juice", category: "Beverages", brand: "Ifad", price: "15.99", image: require("../assets/apple_juice.png") },
    { id: 4, name: "Orange Juice", category: "Beverages", brand: "Ifad", price: "15.99", image: require("../assets/orange_juice.png") },
    { id: 5, name: "Coca Cola Can", category: "Beverages", brand: "Cocola", price: "4.99", image: require("../assets/coka.png") },
    { id: 6, name: "Pepsi Can", category: "Beverages", brand: "Cocola", price: "4.99", image: require("../assets/pepsi.png") },
    { id: 7, name: "Organic Banana", category: "Fresh Fruits", brand: "Individual Collection", price: "4.99", desc: "7pcs", image: require("../assets/banana.png") },
    { id: 8, name: "Red Apple", category: "Fresh Fruits", brand: "Individual Collection", price: "4.99", desc: "1kg", image: require("../assets/apple.png") },
    { id: 9, name: "Fresh Carrot", category: "Fresh Vegetables", brand: "Individual Collection", price: "2.99", desc: "500g", image: require("../assets/carrot.png") },
    { id: 10, name: "Chili", category: "Fresh Vegetables", brand: "Individual Collection", price: "4.99", desc: "1kg", image: require("../assets/chili.png") },
    { id: 11, name: "Ginger", category: "Fresh Vegetables", brand: "Individual Collection", price: "4.99", desc: "250g", image: require("../assets/gung.png") },
    { id: 12, name: "Beef Bone", category: "Meat", brand: "Kazi Farmas", price: "12.99", desc: "1kg", image: require("../assets/beef.png") },
    { id: 13, name: "Broiler Chicken", category: "Meat", brand: "Kazi Farmas", price: "8.99", desc: "1kg", image: require("../assets/chicken.png") },
    { id: 14, name: "Egg Chicken Red", category: "Eggs", brand: "Kazi Farmas", price: "1.99", desc: "4pcs", image: require("../assets/egg chicken red.png") },
    { id: 15, name: "Egg Chicken White", category: "Eggs", brand: "Kazi Farmas", price: "1.50", desc: "180g", image: require("../assets/egg chicken white.png") },
    { id: 16, name: "Egg Pasta", category: "Noodles & Pasta", brand: "Ifad", price: "15.99", desc: "30gm", image: require("../assets/egg pasta.png") },
    { id: 17, name: "Egg Noodles", category: "Noodles & Pasta", brand: "Ifad", price: "15.99", desc: "2L", image: require("../assets/egg noodles.png") },
    { id: 18, name: "Cooking Oil", category: "Cooking Oil", brand: "Ifad", price: "12.99", desc: "1L", image: require("../assets/cooking_oil.png") },
  ];

  // Hàm tìm kiếm
  const performSearch = () => {
    let results = [...allProducts];
    
    if (searchText.trim()) {
      const keyword = searchText.toLowerCase().trim();
      results = results.filter(product => {
        if (product.name.toLowerCase().includes(keyword)) return true;
        if (product.category.toLowerCase().includes(keyword)) return true;
        if (product.desc && product.desc.toLowerCase().includes(keyword)) return true;
        return false;
      });
    }
    
    if (filters.categories.length > 0) {
      results = results.filter(product => filters.categories.includes(product.category));
    }
    
    if (filters.brands.length > 0) {
      results = results.filter(product => filters.brands.includes(product.brand));
    }
    
    setSearchResults(results);
  };

  useEffect(() => {
    performSearch();
  }, [searchText, filters]);

  // Xử lý khi text thay đổi
  const handleTextChange = (text) => {
    setSearchText(text);
  };

  // Xóa text và quay về Explore
  const handleClearSearch = () => {
    setSearchText("");
    setSearchResults([]);
    // Điều hướng về màn hình Explore trong TabNavigator
    navigation.replace("MainApp", {
      screen: "Explore",
    });
  };

  // Điều hướng về Explore khi nhấn nút back
  const handleGoBack = () => {
    // Điều hướng về màn hình Explore trong TabNavigator
    navigation.replace("MainApp", {
      screen: "Explore",
    });
  };

  // Thêm sản phẩm vào giỏ
  const handleAddToCart = async (item) => {
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
  };

  // Áp dụng filter
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setIsFilterVisible(false);
  };

  // Xóa filter
  const clearAllFilters = () => {
    setFilters({ categories: [], brands: [] });
  };

  // Xử lý khi nhấn nút back vật lý
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace("MainApp", {
        screen: "Explore",
      });
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const renderGridItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gridCard}
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <Image source={item.image} style={styles.gridImage} />
      <Text style={styles.gridName}>{item.name}</Text>
      {item.desc && <Text style={styles.gridDesc}>{item.desc}</Text>}
      <Text style={styles.gridPrice}>${item.price}</Text>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listCard}
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <Image source={item.image} style={styles.listImage} />
      <View style={styles.listInfo}>
        <Text style={styles.listName}>{item.name}</Text>
        <Text style={styles.listCategory}>{item.category}</Text>
        {item.desc && <Text style={styles.listDesc}>{item.desc}</Text>}
        <Text style={styles.listPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButtonList}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleGoBack} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleTextChange}
            returnKeyType="search"
            autoFocus={true}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity onPress={() => setIsFilterVisible(true)} style={styles.iconButton}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setIsGrid(!isGrid)} style={styles.gridButton}>
          <Ionicons name={isGrid ? "list-outline" : "grid-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Hiển thị filter đang active */}
      {(filters.categories.length > 0 || filters.brands.length > 0) && (
        <View style={styles.filterBar}>
          <Text style={styles.filterLabel}>Filters:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
            {filters.categories.map(cat => (
              <View key={cat} style={styles.chip}>
                <Text style={styles.chipText}>{cat}</Text>
              </View>
            ))}
            {filters.brands.map(brand => (
              <View key={brand} style={styles.chip}>
                <Text style={styles.chipText}>{brand}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hiển thị số lượng kết quả */}
      {searchText.length > 0 && (
        <View style={styles.resultCount}>
          <Text style={styles.resultCountText}>
            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchText}"
          </Text>
        </View>
      )}

      {/* Kết quả tìm kiếm */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={isGrid ? renderGridItem : renderListItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isGrid ? 2 : 1}
          key={isGrid ? "grid" : "list"}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={isGrid ? styles.columnWrapper : null}
        />
      ) : searchText.length > 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubText}>Try searching with different keywords</Text>
        </View>
      ) : null}

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={handleApplyFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 40,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
  gridButton: {
    marginLeft: 5,
    padding: 5,
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 10,
  },
  filterChips: {
    flex: 1,
    flexDirection: "row",
  },
  chip: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: "green",
  },
  clearText: {
    fontSize: 14,
    color: "red",
    marginLeft: 10,
  },
  resultCount: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultCountText: {
    fontSize: 14,
    color: "#666",
  },
  resultsList: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  gridName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  gridDesc: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  gridPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "green",
    width: 35,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 12,
    bottom: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  listCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  listCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  listDesc: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  listPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  addButtonList: {
    backgroundColor: "green",
    width: 35,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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
});