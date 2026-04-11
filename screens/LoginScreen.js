// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { checkUserExists, saveUser, saveToken } from "../services/storageService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      // Kiểm tra tài khoản có tồn tại không
      const userExists = await checkUserExists(email.trim().toLowerCase(), password.trim());
      
      if (!userExists) {
        Alert.alert("Error", "Invalid email or password. Please sign up first.");
        setLoading(false);
        return;
      }

      // Tạo token giả
      const fakeToken = `token_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      const userSaved = await saveUser(userExists);
      const tokenSaved = await saveToken(fakeToken);

      if (userSaved && tokenSaved) {
        Alert.alert("Success", "Login successful!");
        navigation.replace("MainApp");
      } else {
        Alert.alert("Error", "Failed to save user data");
      }
    } catch (e) {
      console.log("Login error:", e);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo với carrot và lá */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/la.png")}
          style={styles.leaf}
        />
        <Image
          source={require("../assets/carrot.png")}
          style={styles.carrot}
        />
      </View>

      <Text style={styles.title}>Loging</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>

      {/* Email input */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#999"
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.line} />

      {/* Password input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
            placeholder="Enter your password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupLink}>Singup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 30,
    height: 60,
  },
  leaf: {
    position: "absolute",
    top: -5,
    right: "41%",
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  carrot: {
    width: 40,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputWrapper: {
    width: "100%",
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    color: "#333",
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  passwordInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    color: "#333",
    flex: 1,
  },
  eyeIcon: {
    padding: 5,
  },
  line: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 25,
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: "green",
    fontSize: 14,
  },
  button: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#90c890",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#666",
  },
  signupLink: {
    color: "green",
    fontWeight: "bold",
  },
});