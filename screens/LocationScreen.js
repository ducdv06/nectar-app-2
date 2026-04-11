// screens/LocationScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from "react-native";

export default function LocationScreen({ navigation }) {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Location</Text>
      <Text style={styles.subtitle}>Switch on your location to stay in tune with what's happening in your area</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Location</Text>
        <Switch 
          value={isLocationEnabled} 
          onValueChange={setIsLocationEnabled} 
          trackColor={{ false: "#ccc", true: "#53B175" }} 
        />
      </View>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => isLocationEnabled ? navigation.replace("SignIn") : Alert.alert("Warning", "Please enable location")}
      >
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 50, marginBottom: 10 },
  subtitle: { color: "gray", marginBottom: 30, fontSize: 14 },
  switchContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  switchLabel: { fontSize: 16 },
  btn: { backgroundColor: "#53B175", padding: 15, borderRadius: 10, marginTop: 30, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
});