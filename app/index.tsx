import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Forms App!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/EmployeeForm")}
      >
        <Text style={styles.buttonText}>Employee Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => router.push("/(tabs)/SignInForm")}
      >
        <Text style={styles.buttonText}>Sign In Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => router.push("/(tabs)/SignUpForm")}
      >
        <Text style={styles.buttonText}>Sign Up Form</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
