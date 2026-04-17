import { useCallback, useEffect, useState } from "react";
import { CONFIG } from "../constants/Config";
import { Job } from "../types/job";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      // Ensure we see the skeletons for at least 800ms on fast local networks
      await new Promise((resolve) => setTimeout(resolve, 800));

      const response = await fetch(
        `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.JOBS}`,
      );

      if (!response.ok) {
        throw new Error("Could not fetch jobs from server");
      }

      const data = await response.json();
      console.log("[API DEBUG] Jobs count:", data.data?.length || 0);
      setJobs(data.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshJobs = useCallback(async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  }, [fetchJobs]);

  const completeJob = useCallback(
    async (id: string, note: string) => {
      try {
        const response = await fetch(
          `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.COMPLETE(id)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ note }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to complete job");
        }

        // Success: Refresh list to get updated status from server
        await fetchJobs();
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    [fetchJobs],
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    refreshing,
    refreshJobs,
    completeJob,
    fetchJobs,
  };
};
