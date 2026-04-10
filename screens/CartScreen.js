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

export default function CartScreen() {
  const navigation = useNavigation();
  const [showCheckout, setShowCheckout] = useState(false);

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Organic Banana",
      price: 4.99,
      qty: 2,
      image: require("../assets/banana.png"),
    },
    {
      id: 2,
      name: "Red Apple",
      price: 4.99,
      qty: 1,
      image: require("../assets/apple.png"),
    },
    {
      id: 3,
      name: "Diet Coke",
      price: 1.99,
      qty: 3,
      image: require("../assets/diet_coke.png"),
    },
  ]);

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart
      .reduce((sum, item) => sum + item.price * item.qty, 0)
      .toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decreaseQty(item.id)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.qty}</Text>

          <TouchableOpacity
            onPress={() => increaseQty(item.id)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemTotal}>
        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          style={styles.removeButton}
        >
          <Ionicons name="close" size={20} color="red" />
        </TouchableOpacity>

        <Text style={styles.totalPrice}>
          ${(item.price * item.qty).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* LIST */}
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => setShowCheckout(true)}
      >
        <Text style={styles.checkoutText}>Go to Checkout</Text>

        <View style={styles.priceBadge}>
          <Text style={styles.totalAmount}>${getTotalPrice()}</Text>
        </View>
      </TouchableOpacity>

      {/* ================= CHECKOUT ================= */}
      {showCheckout && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayBg}
            onPress={() => setShowCheckout(false)}
          />

          <View style={styles.sheet}>
            {/* HEADER */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setShowCheckout(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>

            {/* DELIVERY */}
            <View>
              <View style={styles.rowLine}>
                <Text style={styles.label}>Delivery</Text>
                <Text>Home - Xóm Chùa</Text>
              </View>
              <View style={styles.divider} />
            </View>

            {/* PAYMENT (ĐÃ FIX) */}
            <View>
              <View style={styles.rowLine}>
                <Text style={styles.label}>Payment</Text>

                <Image
                  source={require("../assets/card.png")}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.divider} />
            </View>

            {/* PROMO */}
            <View>
              <View style={styles.rowLine}>
                <Text style={styles.label}>Promo Code</Text>
                <Text>Pick discount</Text>
              </View>
              <View style={styles.divider} />
            </View>

            {/* TOTAL */}
            <View>
              <View style={styles.rowLine}>
                <Text style={styles.label}>Total Cost</Text>
                <Text style={{ fontWeight: "bold" }}>
                  ${getTotalPrice()}
                </Text>
              </View>
              <View style={styles.divider} />
            </View>

            {/* TERMS */}
            <Text style={styles.terms}>
              By placing an order you agree to our{" "}
              <Text style={{ color: "green" }}>
                Terms And Conditions
              </Text>
            </Text>

            {/* BUTTON */}
            <TouchableOpacity
              style={styles.placeOrderBtn}
              onPress={() => {
                setShowCheckout(false);
                navigation.navigate("OrderSuccess");
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Place Order
              </Text>
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

  cartList: { paddingHorizontal: 20 },

  cartItem: { flexDirection: "row", paddingVertical: 15 },

  separator: {
    height: 1,
    backgroundColor: "#eee",
    width: "90%",
    alignSelf: "center",
  },

  itemImage: {
    width: 80,
    height: 80,
    marginRight: 12,
    resizeMode: "contain",
  },

  itemInfo: { flex: 1 },

  itemName: { fontWeight: "bold" },

  itemPrice: { color: "green", marginBottom: 8 },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyButton: {
    width: 30,
    height: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyButtonText: { fontSize: 18 },

  quantity: { marginHorizontal: 10 },

  itemTotal: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  removeButton: { marginBottom: 10 },

  totalPrice: { color: "green" },

  checkoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },

  checkoutText: { color: "#fff", fontWeight: "bold" },

  priceBadge: {
    backgroundColor: "#1a5c1a",
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  totalAmount: { color: "#fff" },

  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "flex-end",
  },

  overlayBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  rowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    width: "90%",
    alignSelf: "center",
    marginVertical: 8,
  },

  label: { color: "gray" },

  cardImage: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },

  terms: {
    fontSize: 12,
    color: "gray",
    marginTop: 10,
  },

  placeOrderBtn: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});