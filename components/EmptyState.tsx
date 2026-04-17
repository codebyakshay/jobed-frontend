import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../constants/Theme";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.prototype.name;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Jobs Today",
  message = "You're all caught up! Enjoy your free time or check back later.",
  icon = "calendar-clear-outline",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={64} color={Colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: Spacing.md,
  },
});
