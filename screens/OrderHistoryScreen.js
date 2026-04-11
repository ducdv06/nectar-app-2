// screens/OrderHistoryScreen.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getOrders } from "../services/storageService";

export default function OrderHistoryScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      console.log("Orders loaded:", data.length);
    } catch (err) {
      console.log("Load orders error:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  // Hàm format thời gian từ timestamp hoặc date
  const formatDateTime = (item) => {
    if (item.timestamp) {
      const date = new Date(item.timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }
    if (item.date) {
      try {
        const date = new Date(item.date);
        if (!isNaN(date.getTime())) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${day}/${month}/${year} - ${hours}:${minutes}`;
        }
      } catch (e) {}
      return item.date;
    }
    return "Unknown date";
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.orderId || item.id}</Text>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={12} color="green" />
          <Text style={styles.timeText}>{formatDateTime(item)}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {item.items && item.items.slice(0, 2).map((product, idx) => (
          <View key={idx} style={styles.orderItem}>
            <Image source={product.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemQty}>Qty: {product.qty || 1}</Text>
            </View>
            <Text style={styles.itemPrice}>
              ${(parseFloat(product.price) * (product.qty || 1)).toFixed(2)}
            </Text>
          </View>
        ))}
        {item.items && item.items.length > 2 && (
          <Text style={styles.moreItems}>+{item.items.length - 2} more items</Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${parseFloat(item.total).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order History</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContent}>
          <Ionicons name="cube-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubText}>Your orders will appear here</Text>
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
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["green"]} />
        }
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginBottom: 4,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    color: "#999",
  },
  itemsContainer: {
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemQty: {
    fontSize: 12,
    color: "#999",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  moreItems: {
    fontSize: 12,
    color: "green",
    marginTop: 5,
    marginLeft: 60,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
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
  shopBtn: {
    marginTop: 30,
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