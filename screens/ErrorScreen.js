// screens/ErrorScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ErrorScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.message}>This feature is not available yet!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", color: "red", marginBottom: 10 },
  message: { fontSize: 16, color: "gray", marginBottom: 30, textAlign: "center", paddingHorizontal: 40 },
  button: { backgroundColor: "green", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});