import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../constants/Theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "700",
          },
          animation: "slide_from_right",
        }}
      />
    </SafeAreaProvider>
  );
}
