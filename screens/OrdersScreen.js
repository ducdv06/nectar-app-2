// screens/OrdersScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { saveOrder, clearCart } from "../services/storageService";

export default function OrdersScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart, total } = route.params || { cart: [], total: "0.00" };
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const now = new Date();
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
        date: now.toLocaleString(),
        timestamp: now.getTime(),
        fullDate: now.toISOString(),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
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

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.desc || "1kg, Price"}</Text>
        <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
      </View>
      <Text style={styles.itemQty}>x{item.qty || 1}</Text>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Order</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContent}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No items to order</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate("Explore")}
          >
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
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={cart}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, loading && styles.buttonDisabled]}
        onPress={handleConfirmOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        )}
      </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
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
  itemQty: {
    fontSize: 14,
    color: "#666",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  confirmButton: {
    backgroundColor: "green",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#90c890",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 20,
  },
  shopBtn: {
    marginTop: 20,
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});