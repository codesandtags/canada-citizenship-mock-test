# Canada Citizenship Mock Test


### The Comprehensive Project Prompt

**Role:** You are a Senior Full-Stack Engineer and UX Specialist.
**Objective:** Build a web application called "Canada Citizenship Mock Test" to help users prepare for the official exam using the "Discover Canada" study guide.

**1. Technical Stack:**

* **Framework:** Next.js (App Router) with TypeScript.
* **Styling:** Tailwind CSS for a clean, accessible, and "Canadian-themed" UI (using red, white, and neutral tones).
* **Deployment:** Optimized for Vercel.
* **Authentication:** NextAuth.js (Auth.js) supporting Google and GitHub providers.
* **Database:** Prisma with a PostgreSQL (e.g., Vercel Postgres) or MongoDB to store user profiles, past exam scores, and practice history.

**2. Application Structure & Features:**

* **Landing Page:** Highlighting the importance of the test with a prominent "Take a Free Mock" button.
* **The Quiz Engine:**
* **Free Mock:** A standard 20-question quiz accessible to anyone without login.
* **Premium Mocks:** Multiple categorized tests (History, Government, Regions) and "Full Simulations" available only to logged-in users.
* **Functionality:** Multiple-choice format, 30-minute timer, and immediate feedback with explanations for wrong answers.


* **User Dashboard:** For authenticated users to view a progress tracker, see a history of past scores, and identify "weak areas" based on study guide chapters (e.g., "The Justice System" or "Canadian Symbols").

**3. Content Integration (The "Discover Canada" Data):**
Use the provided PDF and official links to populate the database:

* **Questions & Answers:** Extract the official sample questions (e.g., "What are three responsibilities of citizenship?", "What is the meaning of the Remembrance Day poppy?") and generate additional questions based on the "Study Questions" list.
* **Imagery:** Reference the "Photo Credits" section of the guide to include relevant icons or placeholder descriptions for key symbols like the Victoria Cross, the Canadian Crown, or the Parliament Buildings.
* **Study Materials:** Include a section that links back to official chapters such as "Rights and Responsibilities" and "How Canadians Govern Themselves".

**4. Design Requirements:**

* Ensure the app is fully mobile-responsive.
* Adhere to accessibility standards (WCAG) to support users with varying levels of English/French proficiency.
* Include a "Review Mode" where users can see the correct answer cited directly from the study guide text.

**Next Step:** "Please provide the initial folder structure, the `auth.ts` configuration for Google/GitHub, and a reusable `QuizComponent` that handles state for a 20-question mock exam."


## Resources to use

- Official Website: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study.html

- Questions: https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/study-questions.html
