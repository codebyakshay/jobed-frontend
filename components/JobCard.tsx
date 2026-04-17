import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { memo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { BorderRadius, Colors, Spacing, Typography } from "../constants/Theme";
import { Job } from "../types/job";
import { StatusBadge } from "./StatusBadge";

interface JobCardProps {
  job: Job;
  index: number;
  onPress: (job: Job) => void;
}

const JobCardComponent: React.FC<JobCardProps> = ({ job, index, onPress }) => {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress(job);
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 50).duration(400)}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Job: ${job.title} in ${job.area}. Status: ${job.status}. Time: ${job.timeWindow}`}
        accessibilityHint="Navigates to job details and completion screen"
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {job.title}
          </Text>
          <StatusBadge status={job.status} />
        </View>

        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={16}
              color={Colors.textSecondary}
            />
            <Text style={styles.infoText}>{job.timeWindow}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Colors.textSecondary}
            />
            <Text style={styles.infoText}>{job.area}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  footer: {
    flexDirection: "row",
    gap: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
});

export const JobCard = memo(JobCardComponent);
