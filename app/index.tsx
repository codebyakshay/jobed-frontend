import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../components/EmptyState";
import { JobCard } from "../components/JobCard";
import { JobCardSkeleton } from "../components/JobCardSkeleton";
import { Colors, Spacing, Typography } from "../constants/Theme";
import { useJobs } from "../hooks/useJobs";
import { Job, JobStatus } from "../types/job";

export default function JobsScreen() {
  const { jobs, loading, refreshing, refreshJobs, error } = useJobs();
  const router = useRouter();

  const onRefresh = useCallback(async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await refreshJobs();
  }, [refreshJobs]);

  const handleJobPress = useCallback(
    (job: Job) => {
      router.push({
        pathname: "/details/[id]",
        params: { id: job.id },
      });
    },
    [router],
  );

  const showSkeleton = loading || (refreshing && jobs.length === 0);

  if (showSkeleton) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Today&apos;s Jobs</Text>
          <Text style={styles.headerSubtitle}>Loading your schedule...</Text>
        </View>
        <View style={styles.listContent}>
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today&apos;s Jobs</Text>
        <Text style={styles.headerSubtitle}>
          {loading
            ? "Counting..."
            : `${(jobs || []).filter((j) => j?.status !== "completed").length} pending tasks`}
        </Text>
      </View>

      {error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={refreshJobs}>
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          data={jobs.filter((j) => j.status !== JobStatus.COMPLETED)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <JobCard job={item} index={index} onPress={handleJobPress} />
          )}
          ListEmptyComponent={<EmptyState />}
          initialNumToRender={8}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: Spacing.xl,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  retryText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: "600",
  },
});
