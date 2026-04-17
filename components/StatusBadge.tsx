import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BorderRadius, Colors, Spacing, Typography } from "../constants/Theme";
import { JobStatus } from "../types/job";

interface StatusBadgeProps {
  status: JobStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case JobStatus.PENDING:
        return { label: "Pending", colors: Colors.status.pending };
      case JobStatus.IN_PROGRESS:
        return { label: "In Progress", colors: Colors.status.inProgress };
      case JobStatus.COMPLETED:
        return { label: "Completed", colors: Colors.status.completed };
      default:
        return { label: "Unknown", colors: Colors.status.pending };
    }
  };

  const { label, colors } = getStatusConfig();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.bg, borderColor: colors.border },
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${label}`}
    >
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    ...Typography.small,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
