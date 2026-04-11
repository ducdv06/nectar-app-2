// screens/CartScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getCart, saveCart } from "../services/storageService";

export default function CartScreen() {
  const navigation = useNavigation();
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.log("Load cart error:", err);
    }
  };

  const saveCartData = async (newCart) => {
    await saveCart(newCart);
    setCart(newCart);
  };

  const increaseQty = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    saveCartData(newCart);
  };

  const decreaseQty = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && (item.qty || 1) > 1
        ? { ...item, qty: (item.qty || 1) - 1 }
        : item
    );
    saveCartData(newCart);
  };

  const removeItem = (id) => {
    Alert.alert("Remove Item", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Remove", 
        onPress: () => {
          const newCart = cart.filter((item) => item.id !== id);
          saveCartData(newCart);
        }
      },
    ]);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price) * (item.qty || 1), 0)
      .toFixed(2);
  };

  // SỬA LOGIC: Chuyển sang màn hình xác nhận đơn hàng
  // screens/CartScreen.js - Chỉ sửa phần handlePlaceOrder

const handlePlaceOrder = () => {
  if (cart.length === 0) {
    Alert.alert("Error", "Your cart is empty");
    return;
  }
  setShowCheckout(false);
  // Chuyển sang OrdersScreen (màn hình xác nhận đơn hàng)
  navigation.navigate("OrdersScreen", { 
    cart: cart, 
    total: getTotalPrice() 
  });
};

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.desc || "1kg, Price"}</Text>
        <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.qty || 1}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate("Explore")}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity style={styles.checkoutButton} onPress={() => setShowCheckout(true)}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.totalAmount}>${getTotalPrice()}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal Checkout */}
      {showCheckout && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayBg} onPress={() => setShowCheckout(false)} />
          
          <View style={styles.sheet}>
            <View style={styles.handle} />
            
            <Text style={styles.checkoutTitle}>Checkout</Text>
            
            <View style={styles.dividerLine} />
            
            <View style={styles.modalSection}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Delivery</Text>
                <View style={styles.modalSelectRow}>
                  <Text style={styles.modalValue}>Select Method</Text>
                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </View>
              </View>
            </View>
            
            <View style={styles.modalSection}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Pament</Text>
                <View style={styles.modalSelectRow}>
                  <Image source={require("../assets/card.png")} style={styles.flagImage} />
                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </View>
              </View>
            </View>

            <View style={styles.modalSection}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Promo Code</Text>
                <View style={styles.modalSelectRow}>
                  <Text style={styles.modalValue}>Pick discount</Text>
                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </View>
              </View>
            </View>
            
            <View style={styles.modalSection}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Total Cost</Text>
                <Text style={styles.modalTotalValue}>${getTotalPrice()}</Text>
              </View>
            </View>
            
            <View style={styles.dividerLine} />
            
            <Text style={styles.modalTerms}>
              By placing an order you agree to our{" "}
              <Text style={styles.modalTermsLink}>Terms And Conditions</Text>
            </Text>
            
            <TouchableOpacity 
              style={[styles.modalPlaceOrderBtn, loading && styles.btnDisabled]} 
              onPress={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalPlaceOrderText}>Place Order</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  cartList: { paddingHorizontal: 20, paddingBottom: 100 },
  cartItem: { flexDirection: "row", paddingVertical: 15 },
  separator: { height: 1, backgroundColor: "#eee", width: "90%", alignSelf: "center" },
  itemImage: { width: 80, height: 80, marginRight: 12, resizeMode: "contain" },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: "bold", fontSize: 16 },
  itemDesc: { fontSize: 12, color: "#999", marginTop: 2 },
  itemPrice: { color: "green", fontWeight: "bold", marginTop: 4, marginBottom: 8 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: { width: 30, height: 30, backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center", borderRadius: 8 },
  qtyButtonText: { fontSize: 18, fontWeight: "bold" },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  removeButton: { padding: 5 },
  checkoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  priceBadge: { backgroundColor: "#1a5c1a", paddingHorizontal: 12, borderRadius: 8, justifyContent: "center" },
  totalAmount: { color: "#fff", fontWeight: "bold" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#999", marginTop: 20 },
  shopBtn: { marginTop: 20, backgroundColor: "green", paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  shopBtnText: { color: "#fff", fontWeight: "bold" },
  
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "flex-end" },
  overlayBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  handle: { width: 50, height: 5, backgroundColor: "#ccc", borderRadius: 10, alignSelf: "center", marginBottom: 20 },
  checkoutTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  dividerLine: { height: 1, backgroundColor: "#eee", marginVertical: 15 },
  modalSection: { marginBottom: 5 },
  modalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  modalSelectRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  modalLabel: { fontSize: 16, color: "black" },
  modalValue: { fontSize: 16, color: "#999" },
  modalTotalValue: { fontSize: 18, fontWeight: "bold", color: "green" },
  flagImage: { width: 24, height: 16, resizeMode: "contain" },
  modalTerms: { fontSize: 12, color: "gray", textAlign: "left", marginTop: 10, marginBottom: 20 },
  modalTermsLink: { color: "green" },
  modalPlaceOrderBtn: { backgroundColor: "green", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  btnDisabled: { backgroundColor: "#90c890" },
  modalPlaceOrderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});