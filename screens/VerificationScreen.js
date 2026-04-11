// screens/VerificationScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function VerificationScreen({ navigation, route }) {
  const [code, setCode] = useState("");
  const { phone } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your 4-digit code</Text>
      <Text style={styles.subtitle}>Code sent to +880 {phone}</Text>

      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={4}
        placeholder="----"
        textAlign="center"
      />

      <TouchableOpacity onPress={() => Alert.alert("Info", "Code resent")}>
        <Text style={styles.resend}>Resend Code</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => code.length === 4 ? navigation.navigate("Location") : Alert.alert("Error", "Enter 4-digit code")}
      >
        <Text style={styles.btnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 50, marginBottom: 10 },
  subtitle: { color: "gray", marginBottom: 30 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 15, borderRadius: 12, fontSize: 20, letterSpacing: 10, marginBottom: 20 },
  resend: { color: "green", textAlign: "center", marginBottom: 30 },
  btn: { backgroundColor: "#53B175", padding: 15, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
});