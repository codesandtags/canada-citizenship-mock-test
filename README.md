# 🍁 Canada Citizenship Mock Test

An interactive, open-source web application that helps prospective Canadian citizens prepare for the official citizenship exam using realistic, timed mock tests based on the **"Discover Canada"** study guide.

> **Live study resource** — all questions are sourced directly from the [Official Discover Canada Study Guide](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html).

---

## ✨ Features

| Feature | Description |
|---|---|
| **Realistic Mock Exams** | 5 distinct mock exams with 20 multiple-choice questions each, mirroring the official test format. |
| **30-Minute Timer** | Practice under exam-like time pressure with an automatic countdown timer. |
| **Detailed Review** | After each test, review every question with explanations and page-level references to the *Discover Canada* guide. |
| **Focus Mode** | Distraction-free quiz interface — navigation hides automatically during exams. |
| **Dashboard & Analytics** | Authenticated users get a personal dashboard with pass rate, average score, historical results, and weak-area analysis by chapter. |
| **Canadian History Timeline** | Interactive timeline of key events in Canadian history for additional study context. |
| **Confetti on Pass 🎉** | Celebratory confetti animation when you pass a mock exam. |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) with TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) — Canadian-themed red, white & neutral palette |
| **Database** | [Prisma ORM](https://www.prisma.io/) with PostgreSQL |
| **Authentication** | [Supabase Auth](https://supabase.com/docs/guides/auth) (Google & GitHub OAuth) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Code Quality** | ESLint, Husky pre-commit hooks, lint-staged |

---

## 📁 Project Structure

```
├── prisma/                 # Database schema & seed script
│   ├── schema.prisma       # MockExam, Question, QuizResult models
│   └── seed.ts             # Database seeding
├── src/
│   ├── app/
│   │   ├── page.tsx        # Landing page (hero + exam cards + features)
│   │   ├── quiz/           # Timed quiz experience
│   │   ├── dashboard/      # Authenticated user dashboard & results
│   │   ├── login/          # Authentication page
│   │   ├── timeline/       # Canadian history timeline
│   │   └── actions/        # Server Actions (save quiz results)
│   ├── components/
│   │   ├── QuizComponent   # Core quiz engine (timer, questions, review)
│   │   ├── Navbar          # Site navigation with auth state
│   │   ├── Footer          # Site footer
│   │   └── Timeline        # Interactive timeline component
│   └── lib/
│       ├── auth.ts         # Supabase auth helpers
│       ├── prisma.ts       # Prisma client singleton
│       ├── mocks/          # 5 mock exam question banks (mock1–mock5)
│       └── timeline-data   # Canadian history timeline data
├── public/                 # Static assets & Discover Canada PDF
├── project/                # Project requirements & documentation
└── docs/                   # Additional documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** (local via Docker or a hosted instance)

### 1. Clone & Install

```bash
git clone https://github.com/<your-username>/canada-citizenship-mock-test.git
cd canada-citizenship-mock-test
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/canada_mock_test"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Set Up the Database

```bash
# Start PostgreSQL via Docker (optional)
docker compose up -d

# Push the Prisma schema to your database
npm run db:push

# Seed mock exam data
npm run db:seed
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start practicing.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Generate Prisma client & create production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the codebase |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:seed` | Seed the database with mock exam data |
| `npm run db:studio` | Open Prisma Studio (visual database browser) |
| `npm run db:reset` | Force-reset the database & re-seed |

---

## 🗃 Data Model

```
MockExam  ──< Question
MockExam  ──< QuizResult
```

- **MockExam** — A named collection of questions (e.g. "Official Mock Exam #1").
- **Question** — Multiple-choice question with options, correct answer index, explanation, category, and source reference.
- **QuizResult** — A user's attempt: score, pass/fail status, and the answers they selected.

---

## 🌐 Deployment

This app is optimized for [Vercel](https://vercel.com):

1. Connect your repository to Vercel.
2. Add environment variables in the Vercel dashboard.
3. Vercel will auto-detect Next.js and deploy.

> **Tip:** Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Supabase](https://supabase.com) for a managed PostgreSQL instance.

---

## 📖 Study Material

All mock questions are sourced from the official **"Discover Canada: The Rights and Responsibilities of Citizenship"** guide, published by Immigration, Refugees and Citizenship Canada (IRCC).

📕 [Read the official guide →](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html)

---

## 🤝 Contributing

Contributions are welcome! Whether it's new questions, bug fixes, or feature ideas:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-new-questions`)
3. Commit your changes (`git commit -m 'Add 20 new geography questions'`)
4. Push to the branch (`git push origin feature/add-new-questions`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.
