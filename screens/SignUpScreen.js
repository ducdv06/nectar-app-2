// screens/SignUpScreen.js
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
import { saveUserToUsersList } from "../services/storageService";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const user = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        registeredAt: new Date().toISOString(),
      };

      const result = await saveUserToUsersList(user);

      if (result.success) {
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Login") }
        ]);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (e) {
      console.log("SignUp error:", e);
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

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      {/* Username input */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="words"
          placeholderTextColor="#999"
          placeholder="Enter your username"
        />
      </View>
      <View style={styles.line} />

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

      {/* Confirm Password input */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#999"
            placeholder="Confirm your password"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      {/* Terms and conditions */}
      <Text style={styles.termsText}>
        By continuing you agree to our{" "}
        <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
        <Text style={styles.termsLink}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
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
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  termsLink: {
    color: "green",
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#666",
  },
  loginLink: {
    color: "green",
    fontWeight: "bold",
  },
});