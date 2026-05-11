# Personalized Content Dashboard

A modern, high-performance content aggregation dashboard built with **Next.js 14**, **TypeScript**, and **Redux Toolkit**. This application provides a unified interface for news, movies, and social media posts with advanced features like drag-and-drop reordering, personalized preferences, and dark mode.

## ✨ Key Features

- 🎯 **Personalized Content Feed**: Unified dashboard for news, movie recommendations, and social media posts.
- ⚙️ **User Preferences**: Configure favorite categories and content sources via a dedicated settings panel.
- 💾 **Persistence**: State is saved to `localStorage` using `redux-persist` to maintain your session.
- 🖱️ **Drag-and-Drop**: Reorder your feed items exactly how you want them using `@hello-pangea/dnd`.
- 🔍 **Debounced Search**: Optimized search functionality across all content types.
- 🌓 **Dark Mode**: Seamless theme switching with premium dark-themed aesthetics.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- ⚡ **Rich Animations**: Smooth transitions and hover effects using `Framer Motion`.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit & RTK Query
- **Persistence**: Redux Persist
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Utility**: clsx, tailwind-merge, date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd content-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/store`: Redux Toolkit store, slices, and persistence logic.
- `src/components`: Reusable UI components, layout, and cards.
- `src/lib`: API services and utility functions.
- `src/types`: TypeScript interfaces and types.
- `src/hooks`: Custom React hooks for global state and logic.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run E2E tests (Cypress):
```bash
npm run cypress:open
```

## 📝 Assignment Requirements Checklist

- [x] Personalized Content Feed (News, Movies, Social)
- [x] User Preferences & Persistence (Local Storage/Redux)
- [x] Interactive Content Cards (Favorites, CTA)
- [x] Sidebar & Header Navigation
- [x] Debounced Search Functionality
- [x] Drag-and-Drop Organization
- [x] Dark Mode
- [x] Smooth Animations
- [x] Responsive Design
