import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { BorderRadius, Spacing } from "../constants/Theme";

const { width } = Dimensions.get("window");

export const JobCardSkeleton = () => {
  const shimmerPosition = useSharedValue(-1);

  useEffect(() => {
    shimmerPosition.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false,
    );
  }, [shimmerPosition]);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerPosition.value,
      [-1, 1],
      [-width, width],
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleLine} />
        <View style={styles.badgePlaceholder} />
      </View>
      <View style={styles.metaLine} />
      <View style={[styles.metaLine, { width: "60%" }]} />

      {/* The Shimmer Overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.4)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  titleLine: {
    height: 20,
    width: "50%",
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.sm,
  },
  badgePlaceholder: {
    height: 24,
    width: 80,
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.full,
  },
  metaLine: {
    height: 16,
    width: "80%",
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
});
