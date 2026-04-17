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
import { BorderRadius, Colors, Spacing } from "../constants/Theme";

const { width } = Dimensions.get("window");

export const JobDetailSkeleton = () => {
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

  const ShimmerOverlay = () => (
    <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
      <LinearGradient
        colors={["transparent", "rgba(255, 255, 255, 0.4)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Title Card Skeleton */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleLine} />
          <View style={styles.badgeLine} />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconPlaceholder} />
          <View style={styles.textLineShort} />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconPlaceholder} />
          <View style={styles.textLineMedium} />
        </View>
        <ShimmerOverlay />
      </View>

      {/* Description Section Skeleton */}
      <View style={styles.section}>
        <View style={styles.sectionTitle} />
        <View style={styles.descriptionBox}>
          <View style={styles.textLineFull} />
          <View style={styles.textLineFull} />
          <View style={styles.textLineMedium} />
          <ShimmerOverlay />
        </View>
      </View>

      {/* Button Skeleton */}
      <View style={styles.buttonPlaceholder}>
        <ShimmerOverlay />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  titleLine: {
    height: 28,
    width: "60%",
    backgroundColor: "#CBD5E1",
    borderRadius: BorderRadius.sm,
  },
  badgeLine: {
    height: 24,
    width: 80,
    backgroundColor: "#CBD5E1",
    borderRadius: BorderRadius.full,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#CBD5E1",
    borderRadius: BorderRadius.md,
  },
  textLineShort: {
    height: 16,
    width: "40%",
    backgroundColor: "#CBD5E1",
    borderRadius: BorderRadius.sm,
  },
  textLineMedium: {
    height: 16,
    width: "70%",
    backgroundColor: "#CBD5E1",
    borderRadius: BorderRadius.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    height: 22,
    width: 140,
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  descriptionBox: {
    backgroundColor: "#F1F5F9",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    overflow: "hidden",
    minHeight: 100,
    gap: Spacing.sm,
  },
  textLineFull: {
    height: 14,
    width: "100%",
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.sm,
  },
  buttonPlaceholder: {
    height: 56,
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.lg,
    marginTop: "auto",
    overflow: "hidden",
  },
});
