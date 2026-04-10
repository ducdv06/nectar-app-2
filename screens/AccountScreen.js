import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen() {
  const menuItems = [
    { icon: "cube-outline", label: "Orders" },
    { icon: "person-outline", label: "My Details" },
    { icon: "location-outline", label: "Delivery Address" },
    { icon: "card-outline", label: "Payment Methods" },
    { icon: "pricetag-outline", label: "Promo Cord" },
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "help-circle-outline", label: "Help" },
    { icon: "information-circle-outline", label: "About" },
  ];

  return (
    <View style={styles.container}>

      {/* PROFILE */}
      <View style={styles.profile}>
        <Image
          source={require("../assets/anhaccount.jpg")} // 👈 FIX .jpg
          style={styles.avatar}
        />

        <View style={styles.info}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.name}>Afsar Hossen</Text>
            <Ionicons name="create-outline" size={16} color="green" />
          </View>
          <Text style={styles.email}>imshuvo79@gmail.com</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.left}>
              <Ionicons name={item.icon} size={22} color="#555" />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="green"
          style={{ position: "absolute", left: 20 }} // 👈 icon trái
        />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  info: {
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },

  email: {
    color: "gray",
    marginTop: 3,
  },

  menu: {
    marginTop: 10,
    backgroundColor: "#fff",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  menuText: {
    fontSize: 16,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 90, // 👈 cách tab
    marginTop: 10,
    padding: 15,
    backgroundColor: "#dff5e3", // 👈 màu đậm hơn nhẹ
    borderRadius: 15,
  },

  logoutText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
});