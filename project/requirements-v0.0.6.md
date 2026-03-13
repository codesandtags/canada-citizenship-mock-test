# Canada Citizenship Mock Test - V0.0.6

This iteration focuses on making the mock exam system fully functional for authenticated users, ensuring result persistence, and providing meaningful historical insights.

## Planned Features and Improvements

### 1. Mock Exam Access & Authentication
- **User Association:** Automatically link quiz results to the logged-in user's profile using Supabase Auth ID.
- **Protected vs. Public Access:** 
    - Keep "Mock Exam #1" accessible to guests but prompt for login/signup at the end to save results.
    - Restrict "Mock Exam #2" and subsequent exams to logged-in users to encourage account creation.
- **Enhanced Dashboard Integration:** All available mock exams should be visible and launchable directly from the User Dashboard.

### 2. Result Persistence & Data Integrity
- **Comprehensive Saving:** Ensure `saveQuizAction` correctly stores the score, total questions, pass/fail status, and the array of user answers in the PostgreSQL database.
- **Question Categorization:** Add a `category` or `chapter` field (e.g., "History", "Government", "Rights") to the `Question` model and existing mock data.
- **Database Synchronization:** Migrate in-memory mock exam definitions to the database to enable robust relations between `QuizResult` and `MockExam`.

### 3. Historical Results & Personalized Analytics
- **Detailed Review View:** Implement a dedicated page `/dashboard/results/[id]` that allows users to revisit a past attempt. It should show:
    - The original question text and options.
    - Which answer the user chose vs. the correct answer.
    - The explanation and study guide reference for each question.
- **Data-Driven "Focus Areas":** Replace hardcoded dashboard suggestions with real analytics. Calculate "Weak Areas" by identifying categories where the user has the highest percentage of incorrect answers across their last 5-10 tests.
- **Progress Visualization:** Enhance the "Improvement Trend" sparkline to use the user's actual score history from the database.

## Technical Tasks
- Update Prisma schema to include `category` in `Question`.
- Create a script or manual migration to populate `MockExam` and `Question` tables from `src/lib/mocks/`.
- Refactor `QuizComponent` to handle the "Review Mode" (read-only state) for the detailed results page.
