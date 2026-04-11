// screens/OnboardingScreen.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Ảnh nền full màn hình */}
      <Image 
        source={require("../assets/onbording.png")} 
        style={styles.backgroundImage} 
      />
      
      {/* Lớp phủ tối để chữ và nút dễ nhìn hơn (tùy chọn) */}
      <View style={styles.overlay} />
      
      {/* Nội dung đè lên ảnh */}
      <View style={styles.content}>
        <Image 
          source={require("../assets/carrot_onbording.png")} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>to our store</Text>
        <Text style={styles.desc}>Get your groceries in as fast as one hour</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Cover để ảnh phủ full màn hình
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)", // Lớp phủ tối nhẹ để chữ nổi bật
  },
  content: {
    top: "25%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: { 
    fontSize: 40, 
    fontWeight: "bold", 
    color: "#fff",
    textAlign: "center",
  },
  desc: { 
    color: "#fff", 
    fontSize: 10,
    marginTop: 10, 
    textAlign: "center", 
    opacity: 0.9,
  },
  button: { 
    marginTop: 40, 
    backgroundColor: "green", 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30, 
    width: "80%", 
    alignItems: "center",
  },
  text: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18,
  },
});