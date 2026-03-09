# Canada Citizenship Mock Test 🍁

A modern, interactive web application to help prospective Canadian citizens study using realistic, timed mock exams based on the official "Discover Canada" study guide.

## Features

- **Realistic Mock Exams**: Generates 20 randomized questions mirroring the official test.
- **Timed Testing Environment**: 30-minute countdown timer to practice under pressure.
- **Detailed End-of-Quiz Review**: In-depth explanations for incorrect answers, paired directly with page-level source references to the *Discover Canada* portal.
- **Focus Mode**: Distraction-free exam interface where navigation hides automatically.
- **Modern Tech Stack**: Built with Next.js 14 App Router, React Server Components, Tailwind CSS, Prisma, and NextAuth.

## Getting Started

First, ensure you have a standard `.env` file generated based on the Prisma schema requirements.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

- **Frontend**: Next.js 14 (App Router) with Tailwind CSS for rapid styling.
- **Database Modeller**: Prisma ORM used for strict schema generation (Targeting PostgreSQL).
- **Authentication Framework**: NextAuth.js configured for OAuth (Google & GitHub).

## Study Material

All mock questions are actively cited from the [Official Discover Canada Study Guide](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to configure the Vercel Postgres add-on to support the Prisma connection string correctly.
