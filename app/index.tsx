import React from "react";
import { View } from "react-native";
import SignInForm from "./(tabs)/SignInForm";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SignInForm />
    </View>
  );
}
