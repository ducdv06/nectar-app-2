import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const navigation = useNavigation();
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
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.qty}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
          <Ionicons name="close" size={20} color="red" />
        </TouchableOpacity>
        <Text style={styles.totalPrice}>${(item.price * item.qty).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.priceBadge}>
              <Text style={styles.totalAmount}>${getTotalPrice()}</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate("Shop")}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartList: {
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    width: "90%",
    alignSelf: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "green",
    fontWeight: "500",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 30,
    height: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 15,
  },
  itemTotal: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  removeButton: {
    padding: 5,
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  checkoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "green",
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  priceBadge: {
    backgroundColor: "#1a5c1a",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
  },
  totalAmount: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
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
  shopButton: {
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});