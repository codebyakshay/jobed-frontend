import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState, useCallback } from "react";
import { Alert, Platform } from "react-native";
import { useJobs } from "./useJobs";

export const useDetailController = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { jobs, loading, completeJob } = useJobs();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const job = jobs.find((j) => j.id === id);

  const handleComplete = useCallback(async () => {
    if (!job) return;

    if (note.trim().length < 5) {
      Alert.alert(
        "Incomplete Note",
        "Please provide a detailed completion note (min 5 characters)."
      );
      return;
    }

    setSubmitting(true);
    const result = await completeJob(job.id, note);
    setSubmitting(false);

    if (result.success) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setModalVisible(false);
      Alert.alert("Success", "Job marked as completed.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert("Error", result.error || "Failed to update job.");
    }
  }, [job, note, completeJob, router]);

  const toggleModal = useCallback((visible: boolean) => {
    setModalVisible(visible);
  }, []);

  return {
    job,
    loading,
    modalVisible,
    note,
    setNote,
    submitting,
    handleComplete,
    toggleModal,
    goBack: () => router.back(),
  };
};
