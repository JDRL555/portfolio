# Joshua Rodriguez | Full-Stack Developer Portfolio

<div align="center">

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD11B?style=for-the-badge&logo=pinia)](https://pinia.vuejs.org/)

</div>

---

## 🚀 About the Project

Welcome to my personal portfolio! This application showcases my journey, skills, and projects as a **Full-Stack Developer** and **Website Instructor**. 

It is designed to be a fast, responsive, and interactive Single Page Application (SPA), built with the modern Web Development ecosystem. It reflects my passion for creating scalable, maintainable, and user-centric web applications.

### 🌟 Key Features

-   **⚡ Modern Tech Stack:** Built with Vue 3 (Composition API), TypeScript, and Vite for blazing fast performance.
-   **🎨 Dynamic Theming:** Fully supported **Dark/Light mode** toggle (persisted via Pinia).
-   **🌍 Internationalization (i18n):** Complete support for **English and Spanish**, dynamically loading content from JSON data sources.
-   **📱 Fully Responsive:** Optimized for all devices using **Tailwind CSS v4**.
-   **🎡 Interactive Components:**
    -   Custom **Carousel** with touch/swipe support.
    -   **Bento Grid** layout for project showcasing.
    -   **Modal** system for detailed bio information.
    -   **Scroll Reveal** animations for a smooth user experience.
-   **💾 State Persistence:** User preferences (theme, language) are saved using `pinia-plugin-persistedstate`.

---

## 🛠️ Technologies Used

### Core
*   **Vue 3** - The Progressive JavaScript Framework.
*   **TypeScript** - Strongly typed JavaScript for better maintainability.
*   **Vite** - Next Generation Frontend Tooling.

### Styling & UI
*   **Tailwind CSS 4** - A utility-first CSS framework (using the new Vite plugin).
*   **Tabler Icons** - High-quality SVG icons.
*   **FontAwesome** - Additional icon support.

### State Management
*   **Pinia** - The intuitive store for Vue.js.

---

## 📂 Project Structure

```bash
src/
├── assets/          # Static assets (migrated to public/ for build)
├── components/      # Reusable Vue components (Carousel, Modal, Forms, etc.)
├── constants/       # App constants and configuration
├── data/            # JSON files for i18n content (site-en.json, site-es.json)
├── sections/        # Main page sections (Experience, Projects, WhoIAm, etc.)
├── services/        # External services (API integrations like CountriesAPI)
├── stores/          # Pinia state stores (Theme, Language, Carousel)
└── utils/           # Helper functions
```

---

## ⚡ Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JDRL555/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The app will align at `http://localhost:5173`.

### 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate the optimized files in the `dist/` directory, ready to be deployed to Netlify, Vercel, or any static host.

---

## 📬 Contact

I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.

*   **Portfolio:** [joshua-rodriguez.netlify.app](https://joshua-rodriguez.netlify.app/)
*   **Github:** [@JDRL555](https://github.com/JDRL555/)
*   **LinkedIn:** [@Joshua Rodriguez](https://www.linkedin.com/in/joshua-rodríguez-8157541a1/)
---

<div align="center">
  <sub>Designed and Built with ❤️ by Joshua Rodriguez</sub>
</div>
