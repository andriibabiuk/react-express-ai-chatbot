# 🤖 React + Express AI Chatbot

A modern full-stack AI chatbot application built with **React**, **Express**, and **TypeScript**. The project combines a responsive user interface with a modular backend architecture to deliver seamless AI-powered conversations through the Google AI API.

## ✨ Features

- 💬 Interactive chat interface with responsive design
- ⚡ Real-time AI conversation experience
- 📝 Message history and typing indicators
- 🔒 End-to-end TypeScript support
- 🎨 Modern UI built with Tailwind CSS and shadcn/ui
- 🏗️ Modular Express backend with controllers, services, and repositories
- 📦 Monorepo structure for organized development
- 🚀 Fast development workflow powered by Vite and Bun

---

## 🛠️ Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)

### Backend

- Node.js
- Express.js
- TypeScript
- Google AI Studio API

### Development Tools

- Bun
- ESLint
- Prettier
- Husky
- lint-staged

---

## 📁 Project Structure

```text
react-express-ai-chatbot/
├── packages/
│   ├── client/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   └── App.tsx
│   │   └── index.html
│   │
│   └── server/
│       ├── controller/
│       ├── services/
│       ├── repositories/
│       └── index.ts
│
├── package.json
├── index.ts
└── bun.lock
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have installed:

- **Node.js** 18 or newer
- **Bun** (recommended package manager)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/andriibabiuk/react-express-ai-chatbot.git
cd react-express-ai-chatbot
```

### 2. Install dependencies

Install dependencies for the root project and both workspaces.

```bash
# Root
bun install

# Server
cd packages/server
bun install
cd ../..

# Client
cd packages/client
bun install
cd ../..
```

---

## 🔑 Environment Variables

Create an environment file inside the server package:

```bash
cd packages/server
cp .env.example .env
```

Add your Google AI API key:

```env
GOOGLE_API_KEY=your_google_ai_api_key
```

---

## ▶️ Running the Application

### Run everything from the project root (recommended)

```bash
bun run dev
```

This command starts both the frontend and backend concurrently.

### Or run each service separately

#### Backend

```bash
cd packages/server
bun run dev
```

#### Frontend

```bash
cd packages/client
bun run dev
```

---

## 🌐 Default Local URLs

| Service  | URL                                                |
| -------- | -------------------------------------------------- |
| Frontend | `http://localhost:5173`                            |
| Backend  | `http://localhost:3000` _(or the configured port)_ |

---

## 📦 Production Build

### Client

```bash
cd packages/client
bun run build
```

### Server

Build or start commands depend on your project configuration.

---

## 🏛️ Architecture

The project follows a modular architecture with a clear separation of responsibilities:

- **Client** – React application responsible for the user interface.
- **Controller Layer** – Handles incoming HTTP requests.
- **Service Layer** – Contains business logic and AI interaction.
- **Repository Layer** – Manages data access and persistence.
- **Google AI Integration** – Processes user prompts and generates responses.

This separation improves maintainability, scalability, and testability.
