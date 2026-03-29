# Aura Budget Mobile

A modern, AI-powered personal finance and budget tracking application built with **Ionic**, **React**, and **Capacitor**. Aura Budget Mobile helps users manage their finances with ease, offering cross-platform support for iOS, Android, and the Web.

## 🚀 Key Features

-   **AI-Powered Transaction Parsing**: Effortlessly add transactions using natural language (e.g., "Spent $15 on lunch today at 1 PM"). The app automatically parses the category, amount, and date.
-   **Multi-Budget Management**: Separate your finances into different budgets like *Personal*, *Business*, and *Savings*.
-   **Comprehensive Financial Insights**: View real-time balance stats, income/expense deltas, and spending summaries.
-   **Modern & Responsive Design**: A beautiful, mobile-first UI with support for both Light and Dark modes (system preference detection).
-   **Native Mobile Support**: Built with Capacitor to deliver a native experience on iOS and Android.

## 🛠 Tech Stack

-   **Frontend Framework**: [Ionic React](https://ionicframework.com/docs/react)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Runtime**: [Capacitor](https://capacitorjs.com/)
-   **Testing**: [Vitest](https://vitest.dev/) (Unit) and [Cypress](https://www.cypress.io/) (E2E)

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Ionic CLI](https://ionicframework.com/docs/intro/cli) (`npm install -g @ionic/cli`)
-   For iOS: [Xcode](https://developer.apple.com/xcode/) and [CocoaPods](https://cocoapods.org/)
-   For Android: [Android Studio](https://developer.android.com/studio)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/aura-budget-mobile.git
    cd aura-budget-mobile
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

#### Web Development
To run the app in your browser with live reloading:
```bash
npm run dev
```

#### Native Mobile (iOS/Android)
1.  Build the project:
    ```bash
    npm run build
    ```

2.  Sync with Capacitor:
    ```bash
    npx cap sync
    ```

3.  Open in native IDEs:
    -   **iOS**: `npx cap open ios`
    -   **Android**: `npx cap open android`

## 🏗 Building for Production

### Web
Generate a production-ready build in the `dist/` directory:
```bash
npm run build
```

### Mobile
For production builds on mobile, use the native tools (Xcode/Android Studio) after running `npx cap sync`.

## 🧪 Testing

-   **Unit Tests**: `npm run test.unit`
-   **End-to-End Tests**: `npm run test.e2e`
-   **Linting**: `npm run lint`

## 📝 License

This project is private and intended for internal use.
