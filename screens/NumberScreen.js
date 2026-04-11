// screens/NumberScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function NumberScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your mobile number</Text>

      <View style={styles.phoneContainer}>
        <Text style={styles.countryCode}>+880</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.note}>Get your groceries with nectar</Text>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.navigate("Verification", { phone })}
      >
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, marginTop: 50 },
  phoneContainer: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#ddd", marginBottom: 20 },
  countryCode: { fontSize: 18, paddingVertical: 10, fontWeight: "bold" },
  input: { flex: 1, fontSize: 18, paddingVertical: 10 },
  note: { color: "gray", marginTop: 10 },
  btn: { backgroundColor: "#53B175", padding: 15, borderRadius: 10, marginTop: 30, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
});