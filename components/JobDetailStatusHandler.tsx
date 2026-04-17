import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "../constants/Theme";
import { JobDetailSkeleton } from "./JobDetailSkeleton";

interface JobDetailStatusHandlerProps {
  loading: boolean;
  jobFound: boolean;
  onBack: () => void;
}

export const JobDetailStatusHandler: React.FC<JobDetailStatusHandlerProps> = ({
  loading,
  jobFound,
  onBack,
}) => {
  if (loading && !jobFound) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Loading..." }} />
        <JobDetailSkeleton />
      </SafeAreaView>
    );
  }

  if (!jobFound) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Job not found</Text>
        <TouchableOpacity 
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back to jobs list"
        >
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  errorText: {
    ...Typography.h2,
    color: Colors.error,
    marginBottom: Spacing.md,
  },
  backLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: "600",
  },
});
