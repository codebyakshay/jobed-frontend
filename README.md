# JobEd - Professional Service Provider App

JobEd is a high-fidelity mobile application designed for service providers to manage their daily schedules, view job details, and track completions with a premium user experience.

## 🚀 Overview

JobEd is a premium React Native application built with Expo, featuring fluid animations, skeleton loading states, and haptic feedback. It provides a seamless interface for managing professional service tasks on the go.

---

## 🛠 Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (to test on physical hardware)

---

## 🏗 Setup & Running

Follow these steps to get the application running on your local machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/codebyakshay/jobed-frontend.git
    cd jobed-frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Expo project**:
    ```bash
    npx expo start
    ```
4.  **Launch the App**:
    - **iOS**: Press `i` to open in the iOS Simulator.
    - **Android**: Press `a` to open in the Android Emulator.
    - **Physical Device**: Scan the QR code using the **Expo Go** app.

---

## ✨ Key Features

- **Premium Design**: Modern aesthetic with a clean typography-first approach and harmonized color palettes.
- **Skeleton Loading**: High-fidelity skeleton screens implemented for zero-layout-shift loading experiences.
- **Fluid Animations**: Staggered entrance animations for job lists using `react-native-reanimated`.
- **Tactile Feedback**: Haptic signals on pull-to-refresh for a native platform feel.
- **Robust Error Handling**: Graceful handling of network failures and empty states with dedicated UI components.
- **TypeScript**: End-to-end type safety throughout the application.

---

## 📂 Project Structure

- `app/`: File-based routing (Index and Details screens).
- `components/`: Reusable UI elements (JobCard, Skeleton, etc.).
- `hooks/`: Custom React hooks for data fetching and state management.
- `constants/`: Design system tokens (Colors, Typography, Spacing).

---

## 📝 Note Requirement

When marking a job as complete, the app requires a **minimum of 5 characters** for the completion note to ensure quality reporting.
