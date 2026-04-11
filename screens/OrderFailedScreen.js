// screens/OrderFailedScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function OrderFailedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❌</Text>
      <Text style={styles.title}>Oops! Order Failed</Text>
      <Text style={styles.desc}>Something went terribly wrong.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace("MainApp")}>
        <Text style={styles.btnText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  icon: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 16, color: "gray", marginBottom: 30, textAlign: "center", paddingHorizontal: 40 },
  button: { backgroundColor: "green", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "bold" },
});