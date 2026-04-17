# JobEd - Professional Service Provider App

JobEd is a high-fidelity mobile application designed for service providers to manage their daily schedules, view job details, and track completions with a premium user experience.

## 🚀 Overview

This project consists of two main components:

1.  **Backend API**: A robust Express.js server written in TypeScript providing job data and completion endpoints.
2.  **Frontend App**: A premium React Native application built with Expo, featuring fluid animations, skeleton loading states, and haptic feedback.

---

## 🛠 Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (to test on physical hardware)

---

## 🏗 Setup & Running

To get the full experience, you need to run both the backend and the frontend simultaneously.

### 1. Backend Setup (`jobed-backend`)

The backend provides the API that the frontend consumes.

1.  **Navigate to the backend directory**:
    ```bash
    cd ../jobed-backend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    _The server will start on `http://localhost:3000` by default._

### 2. Frontend Setup (`Jobed-Frontend`)

The mobile application handles the UI and user interactions.

1.  **Navigate to the frontend directory**:
    ```bash
    cd Jobed-Frontend
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
- **TypeScript**: End-to-end type safety for both client and server.

---

## 📂 Project Structure

### Backend

- `src/index.ts`: Application entry point.
- `src/controllers/`: Request handling logic.
- `src/services/`: Business logic and data management.
- `src/validators/`: Input validation (e.g., Note length requirements).

### Frontend

- `app/`: File-based routing (Index and Details screens).
- `components/`: Reusable UI elements (JobCard, Skeleton, etc.).
- `hooks/`: Custom React hooks for data fetching and state management.
- `constants/`: Design system tokens (Colors, Typography, Spacing).

---

## 📝 Note Requirement

When marking a job as complete, a **minimum of 5 characters** is required for the completion note to ensure quality reporting.
