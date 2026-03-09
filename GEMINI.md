# Canada Citizenship Mock Test - GEMINI.md

## Project Overview
The **Canada Citizenship Mock Test** is a web application designed to help users prepare for the official Canadian citizenship exam using the "Discover Canada" study guide. It provides a realistic testing environment with multiple-choice questions, a timer, and immediate feedback.

### Main Technologies
- **Framework:** Next.js 14 (App Router) with TypeScript.
- **Styling:** Tailwind CSS (Theme: Canadian-themed red, white, and neutral tones).
- **Authentication:** NextAuth.js (v5 beta) with Google and GitHub providers.
- **Database:** Prisma ORM with PostgreSQL (target: Vercel Postgres).
- **Icons:** Lucide React.
- **Content:** Based on the "Discover Canada" study guide (PDF included in `public/`).

### Architecture
- **Frontend:** React Server Components (RSC) and Client Components for interactivity (e.g., `QuizComponent`).
- **Backend:** Next.js API Routes and Server Actions (planned) for database interactions.
- **Data Model:** Defined in `prisma/schema.prisma`, featuring `Question` and `QuizResult` models.

---

## Building and Running

### Key Commands
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Start Production:** `npm run start`
- **Linting:** `npm run lint`
- **Database Migration:** `npx prisma db push` (or `npx prisma migrate dev` if using migrations)
- **Generate Prisma Client:** `npx prisma generate`

### Environment Variables
Ensure the following are set in `.env`:
- `DATABASE_URL`: Connection string for PostgreSQL.
- `AUTH_SECRET`: Secret for NextAuth.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: For Google Auth.
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: For GitHub Auth.

---

## Development Conventions

### Coding Style
- **TypeScript:** Use strict typing. Define interfaces/types for data models.
- **Components:** Use functional components. Prefer Server Components by default; use `"use client"` only when necessary for state or effects.
- **Styling:** Use Tailwind CSS utility classes. Maintain the "Canadian" aesthetic (Red/White/Neutral).
- **Accessibility:** Ensure WCAG compliance for high readability and mobile responsiveness.

### Testing Practices
- Currently, no formal testing framework is explicitly configured in `package.json`, but manual verification of the quiz engine and authentication flow is required.

### Data Management
- Questions should be sourced from the "Discover Canada" guide.
- Use the `prisma/schema.prisma` for any database changes and regenerate the client with `npx prisma generate`.

---

## Directory Highlights
- `src/app/`: App Router pages and layouts.
- `src/components/`: Reusable UI components (e.g., `QuizComponent.tsx`).
- `src/lib/`: Utility functions and shared logic (e.g., `auth.ts`).
- `prisma/`: Database schema and configuration.
- `project/`: Requirements and project documentation.
- `public/`: Static assets and the "Discover Canada" PDF.
