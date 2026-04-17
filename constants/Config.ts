import { Platform } from "react-native";

// On Android emulators, localhost is 10.0.2.2
const LOCALHOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";

export const CONFIG = {
  API_BASE_URL: `http://${LOCALHOST}:3000/api`,
  ENDPOINTS: {
    JOBS: "/jobs",
    COMPLETE: (id: string) => `/jobs/${id}/complete`,
  },
};
