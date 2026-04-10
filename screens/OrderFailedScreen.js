import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function OrderFailedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.icon}>❌</Text>

      <Text style={styles.title}>Oops! Order Failed</Text>
      <Text style={styles.desc}>
        Something went terribly wrong.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>Please Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.link}>Back to home</Text>
      </TouchableOpacity>

    </View>
  );
}