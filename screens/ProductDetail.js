import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetail() {
  const navigation = useNavigation();
  const [qty, setQty] = useState(1);

  return (
    <View style={styles.container}>

      {/* 🔥 TOP BAR FIXED */}
      <View style={styles.topBar}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detail</Text>
        </View>

        <TouchableOpacity>
          <Image
            source={require("../assets/upload.png")}
            style={styles.uploadIcon}
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 80 }} // 🔥 tránh bị đè bởi topBar
      >

        {/* IMAGE */}
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/apple.png")}
            style={styles.image}
          />
        </View>

        {/* INFO */}
        <View style={styles.info}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>Naturel Red Apple</Text>
            <Ionicons name="heart-outline" size={20} />
          </View>

          <Text style={styles.desc}>1kg, Price</Text>

          {/* QTY */}
          <View style={styles.qtyRow}>
            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => setQty(qty > 1 ? qty - 1 : 1)}>
                <Ionicons name="remove" size={16} color="#53B175" />
              </TouchableOpacity>

              <Text style={styles.qty}>{qty}</Text>

              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Ionicons name="add" size={16} color="#53B175" />
              </TouchableOpacity>
            </View>

            <Text style={styles.price}>$4.99</Text>
          </View>
        </View>

        {/* PRODUCT DETAIL */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons name="chevron-down" size={18} />
          </View>

          <Text style={styles.sectionText}>
            Apples are nutritious. Apples may be good for weight loss.
            Apples may be good for your heart. As part of a healthy diet.
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add To Basket</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // 🔥 TOP BAR
  topBar: {
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  uploadIcon: {
    width: 20,
    height: 20,
  },

  imageWrapper: {
    backgroundColor: "#F2F3F2",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },

  info: {
    padding: 20,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  desc: {
    color: "#7C7C7C",
    marginTop: 5,
  },

  qtyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 10,
  },

  qty: {
    fontSize: 14,
  },

  price: {
    fontSize: 16,
    fontWeight: "600",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  sectionText: {
    color: "#7C7C7C",
    marginTop: 5,
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#53B175",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    margin: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});