# 🤖 React + Express AI Chatbot & Data Analyzer

<p align="center">
  <strong>A modern full-stack AI application built with React, Express, TypeScript, Prisma, and Google Gemini.</strong>
</p>

<p align="center">
  AI-powered conversations • Intelligent review summarization • Clean architecture • Monorepo
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun" />
</p>

---

## 📖 Overview

This project is a modern full-stack AI application built with **React**, **Express**, and **TypeScript**.

It combines an interactive AI chatbot with intelligent product review summarization powered by the **Google Gemini API**. The application follows a clean monorepo architecture, providing a scalable and maintainable codebase with a clear separation between the frontend and backend.

The backend uses **Prisma ORM** for database management and implements a modular **Controller → Service → Repository** architecture.

---

## ✨ Features

- 💬 AI-powered real-time chat
- 🤖 Google Gemini API integration
- 📊 Automatic product review summarization
- 🛍️ Product & review management
- 🗄️ Prisma ORM with relational database support
- ⚡ End-to-end TypeScript
- 🎨 Responsive UI with Tailwind CSS & shadcn/ui
- 🏗️ Modular backend architecture
- 🚀 Bun workspaces monorepo
- 🔍 Type-safe API communication

---

# 🛠 Tech Stack

## Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI

## Backend

- Node.js
- Express.js
- Prisma ORM
- Google Gemini API

## Development

- Bun
- ESLint
- Prettier
- Husky
- lint-staged

---

# 📂 Project Structure

```text
react-express-ai-chatbot/
│
├── packages/
│   │
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
│       ├── llm/
│       ├── prompts/
│       ├── prisma/
│       └── index.ts
│
├── package.json
└── bun.lock
```

---

# 🏛 Architecture

The backend follows the **Controller → Service → Repository** pattern.

```text
React Client
      │
      ▼
Express Controllers
      │
      ▼
Business Services
      │
      ▼
Repositories
      │
      ▼
Prisma ORM
      │
      ▼
Database
```

For AI functionality:

```text
Client
   │
   ▼
Chat Controller
   │
   ▼
Chat Service
   │
   ▼
Gemini Client
   │
   ▼
Google Gemini API
```

---

# ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Node.js **18+**
- Bun
- PostgreSQL (or another supported relational database)

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/andriibabiuk/react-express-ai-chatbot.git

cd react-express-ai-chatbot
```

## Install dependencies

```bash
bun install
```

---

# 🗄 Database Setup

Navigate to the server package and run Prisma migrations.

```bash
cd packages/server

bunx prisma migrate dev

cd ../..
```

---

# 🔑 Environment Variables

Inside **packages/server**, create a `.env` file.

```bash
cp .env.example .env
```

Example:

```env
GOOGLE_API_KEY=your_google_api_key
DATABASE_URL=your_database_url
PORT=3000
```

---

# ▶ Running the Project

## Start both applications

```bash
bun run dev
```

---

## Run backend only

```bash
cd packages/server

bun run dev
```

---

## Run frontend only

```bash
cd packages/client

bun run dev
```

---

# 🌐 Default URLs

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |

---

# 📦 Main Modules

### Client

- Chat UI
- Review components
- Shared UI components
- API utilities

### Server

- Chat controller
- Product controller
- Review controller
- LLM client
- Prompt templates
- Prisma repositories
- Business services
