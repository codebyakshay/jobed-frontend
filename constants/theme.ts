export const Colors = {
  primary: "#4F46E5", // Indigo
  primaryLight: "#EEF2FF", // Light Indigo
  background: "#F8FAFC", // Slate 50
  card: "#FFFFFF",
  text: "#1E293B", // Slate 800
  textSecondary: "#64748B", // Slate 500
  border: "#E2E8F0", // Slate 200
  error: "#EF4444", // Red 500

  status: {
    pending: {
      bg: "#F1F5F9",
      text: "#475569",
      border: "#E2E8F0",
    },
    inProgress: {
      bg: "#FFFBEB",
      text: "#B45309",
      border: "#FEF3C7",
    },
    completed: {
      bg: "#ECFDF5",
      text: "#047857",
      border: "#D1FAE5",
    },
  },

  white: "#FFFFFF",
  shadow: "#000000",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
};
