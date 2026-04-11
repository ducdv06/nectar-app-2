// screens/CheckoutScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveOrder, clearCart } from "../services/storageService";

export default function CheckoutScreen({ navigation, route }) {
  const { cart, total } = route?.params || { cart: [], total: "0.00" };
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const order = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty || 1,
          image: item.image,
          desc: item.desc,
        })),
        total: parseFloat(total),
        date: new Date().toLocaleString(),
        timestamp: Date.now(),
      };

      const success = await saveOrder(order);

      if (success) {
        await clearCart();
        navigation.replace("OrderSuccess", { order });
      } else {
        navigation.replace("OrderFailed");
      }
    } catch (err) {
      console.log("Order error:", err);
      navigation.replace("OrderFailed");
    } finally {
      setLoading(false);
    }
  };

  const displayItems = cart.slice(0, 2);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* My Cart title */}
      <Text style={styles.myCartTitle}>My Cart</Text>

      {/* Danh sách sản phẩm */}
      <View style={styles.cartItems}>
        {displayItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.desc || "1kg, Price"}</Text>
              <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Checkout title */}
      <Text style={styles.checkoutTitle}>Checkout</Text>

      {/* Delivery */}
      <View style={styles.section}>
        <View style={styles.rowLine}>
          <Text style={styles.label}>Delivery</Text>
          <View style={styles.selectRow}>
            <Text style={styles.value}>Select Method</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </View>
        </View>
        <View style={styles.divider} />
      </View>

      {/* Payment */}
      <View style={styles.section}>
        <View style={styles.rowLine}>
          <Text style={styles.label}>Pament</Text>
          <View style={styles.selectRow}>
            <Text style={styles.value}>Promo Code</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </View>
        </View>
        <View style={styles.divider} />
      </View>

      {/* Total Cost */}
      <View style={styles.section}>
        <View style={styles.rowLine}>
          <Text style={styles.label}>Total Cost</Text>
          <Text style={styles.totalValue}>${parseFloat(total).toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        By placing an order you agree to our{" "}
        <Text style={styles.termsLink}>Terms And Conditions</Text>
      </Text>

      {/* Place Order Button */}
      <TouchableOpacity
        style={[styles.placeOrderBtn, loading && styles.btnDisabled]}
        onPress={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.placeOrderText}>Place Order</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  myCartTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  cartItems: {
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemDesc: {
    fontSize: 12,
    color: "#999",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  checkoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  rowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#999",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginTop: 12,
  },
  terms: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  termsLink: {
    color: "green",
  },
  placeOrderBtn: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "green",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: "#90c890",
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});