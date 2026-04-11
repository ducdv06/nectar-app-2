// screens/ProductDetail.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addToCart } from "../services/storageService";

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Lấy item từ params, nếu không có thì dùng dữ liệu mặc định
  const { item } = route.params || {};
  
  // Dữ liệu mặc định nếu không có item
  const product = item || {
    id: 1,
    name: "Naturel Red Apple",
    price: "4.99",
    desc: "1kg, Price",
    image: require("../assets/apple.png"),
  };
  
  const [quantity, setQuantity] = useState(1);
  const [showFullDetail, setShowFullDetail] = useState(false);

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      desc: product.desc,
    };
    await addToCart(productToAdd, quantity);
    Alert.alert("Success", `${quantity} x ${product.name} added to cart`);
  };

  const shortDetail = "Apples Are Nutritious. Apples May Be Good For Weight Loss.";
  const fullDetail = "Apples Are Nutritious. Apples May Be Good For Weight Loss.\nApples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hình ảnh sản phẩm - nền xám full chiều ngang */}
      <View style={styles.imageWrapper}>
        <View style={styles.imageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <Image source={require("../assets/upload.png")} style={styles.uploadIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} />
        </View>
      </View>

      {/* Nội dung bên dưới */}
      <View style={styles.contentContainer}>
        {/* Tên sản phẩm và icon heart */}
        <View style={styles.nameRow}>
          <Text style={styles.productName}>{product.name}</Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.productDesc}>{product.desc || "1kg, Price"}</Text>
        
        {/* Bộ chọn số lượng và giá - ngang nhau */}
        <View style={styles.priceQuantityRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQty} style={styles.qtyButton}>
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBorder}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={increaseQty} style={styles.qtyButton}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productPrice}>${(parseFloat(product.price) * quantity).toFixed(2)}</Text>
        </View>

        {/* Product Detail section - có nút xem thêm */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setShowFullDetail(!showFullDetail)}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons 
              name={showFullDetail ? "chevron-up-outline" : "chevron-down-outline"} 
              size={18} 
              color="#999" 
            />
          </TouchableOpacity>

          <Text style={styles.sectionContent}>
            {showFullDetail ? fullDetail : shortDetail}
          </Text>
          {!showFullDetail && (
            <TouchableOpacity onPress={() => setShowFullDetail(true)} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View more</Text>
              <Ionicons name="chevron-down-outline" size={14} color="green" />
            </TouchableOpacity>
          )}
        </View>

        {/* Nutrition section - có ">" bên phải và nền xám cho 100g */}
        <TouchableOpacity style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Nutrition</Text>
          <View style={styles.rightContent}>
            <View style={styles.nutritionBadge}>
              <Text style={styles.nutritionText}>100g</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </View>
        </TouchableOpacity>

        {/* Review section - có ">" bên phải và sao màu cam */}
        <TouchableOpacity style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Review</Text>
          <View style={styles.rightContent}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFA500" />
              <Ionicons name="star" size={16} color="#FFA500" />
              <Ionicons name="star" size={16} color="#FFA500" />
              <Ionicons name="star" size={16} color="#FFA500" />
              <Ionicons name="star" size={16} color="#FFA500" />
              <Text style={styles.ratingText}>(5.0)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </View>
        </TouchableOpacity>

        {/* Add to Basket Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Phần ảnh - nền xám full
  imageWrapper: {
    backgroundColor: "#f5f5f5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  uploadButton: {
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  uploadIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  productImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  // Nội dung bên dưới
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  productDesc: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
    marginBottom: 15,
  },
  priceQuantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  quantityBorder: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginHorizontal: 10,
    minWidth: 50,
    alignItems: "center",
    paddingVertical: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 15,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  section: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  sectionContent: {
    fontSize: 11,
    color: "#666",
    lineHeight: 18,
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 12,
    color: "green",
    marginRight: 4,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nutritionBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  nutritionText: {
    fontSize: 13,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: "green",
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});