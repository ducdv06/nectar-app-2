import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CheckoutScreen({ navigation }) {
  return (
    <View style={styles.overlay}>

      {/* vùng tối phía trên (bấm để đóng) */}
      <TouchableOpacity
        style={styles.backdrop}
        onPress={() => navigation.goBack()}
      />

      {/* sheet kéo lên */}
      <View style={styles.sheet}>

        {/* thanh kéo */}
        <View style={styles.handle} />

        {/* title */}
        <Text style={styles.title}>Checkout</Text>

        {/* address */}
        <View style={styles.row}>
          <Text style={styles.label}>Delivery</Text>
          <Text>Home - Xóm Chùa</Text>
        </View>

        {/* payment */}
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

        {/* total */}
        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={{ fontWeight: "bold" }}>$12.98</Text>
        </View>

        {/* button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("OrderSuccess")}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Place Order
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  backdrop: {
    flex: 1,
  },

  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: 300,
  },

  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: {
    color: "gray",
  },

  button: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  cardImage: {
    width: 50,
    height: 30,
    resizeMode: "contain",
    },
});