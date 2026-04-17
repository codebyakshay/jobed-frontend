import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../constants/Theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go back to dashboard</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  link: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
  },
  linkText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: "600",
  },
});
