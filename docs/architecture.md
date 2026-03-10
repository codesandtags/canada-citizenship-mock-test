# Architecture Diagrams

## Sequence Diagram (App Flow)

This diagram represents the user flow through the application from the landing page, selecting a mock exam, taking the quiz, and seeing the results.

```mermaid
sequenceDiagram
    actor User
    participant Browser as Front-End (Next.js)
    participant Mocks as Static Data (src/lib/mocks)

    User->>Browser: Visit Home Page (/)
    Browser->>Mocks: Fetch available mock exams
    Mocks-->>Browser: Return MockExam array
    Browser-->>User: Display grid of available mocks

    User->>Browser: Click "Start Mock Exam" (?id=1)
    Browser->>Browser: Route to /quiz?id=1
    Browser->>Mocks: getMockExamById("1")
    Mocks-->>Browser: Return Mock Exam data & questions

    loop For each question (1 to 20)
        Browser-->>User: Display question & 30 min timer
        User->>Browser: Select answer
        Browser-->>User: Show correct/incorrect feedback & explanation
        User->>Browser: Click "Next Question"
    end

    Browser->>Browser: Calculate final score
    Browser-->>User: Display Completion Screen & Detailed Review Breakdown
    User->>Browser: Click "Retake" or "Go Home"
```

## Entity Relationship Diagram (ERD)

This diagram represents the data models defined in Prisma that will be used to persist mock exams, questions, and user performance.

```mermaid
erDiagram
    MOCK_EXAM {
        String id PK
        String title
        String description
        DateTime createdAt
        DateTime updatedAt
    }

    QUESTION {
        String id PK
        String text
        String[] options
        Int correctAnswer
        String explanation
        String reference "Nullable"
        String mockExamId FK "Nullable"
        DateTime createdAt
        DateTime updatedAt
    }

    QUIZ_RESULT {
        String id PK
        String userId "Nullable"
        Int score
        Int total
        Boolean passed
        Int[] answers
        String mockExamId FK "Nullable"
        DateTime createdAt
    }

    MOCK_EXAM ||--o{ QUESTION : "contains"
    MOCK_EXAM ||--o{ QUIZ_RESULT : "has"
```
