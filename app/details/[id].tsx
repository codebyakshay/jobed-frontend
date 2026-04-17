import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { JobDetailStatusHandler } from "../../components/JobDetailStatusHandler";
import { StatusBadge } from "../../components/StatusBadge";
import {
  BorderRadius,
  Colors,
  Spacing,
  Typography,
} from "../../constants/Theme";
import { useDetailController } from "../../hooks/useDetailController";
import { JobStatus } from "../../types/job";

export default function JobDetailsScreen() {
  const {
    job,
    loading,
    modalVisible,
    note,
    setNote,
    submitting,
    handleComplete,
    toggleModal,
    goBack,
  } = useDetailController();

  if (!job || (loading && !job)) {
    return (
      <JobDetailStatusHandler
        loading={loading}
        jobFound={!!job}
        onBack={goBack}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Job Details",
          headerBackTitle: "Jobs",
          headerTintColor: Colors.primary,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.duration(600).springify()}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{job.title}</Text>
              <StatusBadge status={job.status} />
            </View>

            <View style={styles.metaRow}>
              <View style={styles.iconBox}>
                <Ionicons name="time" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.metaLabel}>Time Window</Text>
                <Text style={styles.metaValue}>{job.timeWindow}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.iconBox}>
                <Ionicons name="location" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.metaLabel}>Location</Text>
                <Text style={styles.metaValue}>{job.area}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Note</Text>
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>
                {job.customerNote || "No notes provided by customer."}
              </Text>
            </View>
          </View>

          {job.status === JobStatus.COMPLETED && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Completion Note</Text>
              <View style={[styles.noteBox, styles.completedNote]}>
                <Text style={styles.noteText}>{job.completionNote}</Text>
                <Text style={styles.completedDate}>
                  ✓ Completed on{" "}
                  {new Date(job.completedAt!).toLocaleDateString()} at{" "}
                  {new Date(job.completedAt!).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {job.status !== JobStatus.COMPLETED && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => toggleModal(true)}
            accessibilityRole="button"
            accessibilityLabel="Mark Job as Complete"
            accessibilityHint="Opens a modal to enter a completion note"
          >
            <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Completion Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Complete Job</Text>
              <TouchableOpacity
                onPress={() => toggleModal(false)}
                accessibilityRole="button"
                accessibilityLabel="Close Modal"
              >
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>
              Enter a detailed note about the work performed:
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="e.g., Replaced the leaking valve and tested for 15 minutes..."
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
              autoFocus
            />

            <View style={styles.modalFooter}>
              <Text
                style={[
                  styles.charCount,
                  {
                    color:
                      note.length >= 5
                        ? Colors.status.completed.text
                        : Colors.error,
                  },
                ]}
              >
                {note.length} / 5 characters minimum
              </Text>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (note.length < 5 || submitting) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleComplete}
                disabled={note.length < 5 || submitting}
              >
                {submitting ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Completion</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  metaLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  metaValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "500",
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  noteBox: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noteText: {
    ...Typography.body,
    color: Colors.text,
  },
  completedNote: {
    borderColor: Colors.status.completed.border,
    backgroundColor: Colors.status.completed.bg,
  },
  completedDate: {
    ...Typography.small,
    color: Colors.status.completed.text,
    marginTop: Spacing.sm,
    fontStyle: "italic",
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  completeButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  completeButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    paddingBottom: Platform.OS === "ios" ? 40 : Spacing.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  modalLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Typography.body,
    color: Colors.text,
    minHeight: 120,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalFooter: {
    marginTop: Spacing.lg,
  },
  charCount: {
    ...Typography.small,
    marginBottom: Spacing.xs,
    textAlign: "right",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  submitButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: "700",
  },
});
