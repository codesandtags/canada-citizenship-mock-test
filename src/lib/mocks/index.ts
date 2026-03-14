import { mock1Questions } from './mock1';
import { mock2Questions } from './mock2';
import { mock3Questions } from './mock3';
import { mock4Questions } from './mock4';
import { mock5Questions } from './mock5';

export interface QuestionType {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string; // Required for V0.0.6 analytics
  reference?: string;
}

export interface MockExamType {
  id: string; // URL-friendly string, e.g., '1', '2'
  title: string;
  description: string;
  questions: QuestionType[];
}

export const availableMocks: MockExamType[] = [
  {
    id: "1",
    title: "Official Mock Exam #1",
    description: "The original 20-question citizenship practice test covering various topics.",
    questions: mock1Questions
  },
  {
    id: "2",
    title: "Official Mock Exam #2",
    description: "A fresh set of 20 randomized questions from the study guide.",
    questions: mock2Questions
  },
  {
    id: "3",
    title: "Geography & Economy Mock",
    description: "Deep dive into Canada's regions, resources, and industries.",
    questions: mock3Questions
  },
  {
    id: "4",
    title: "Canadian History Mock",
    description: "Focused on key historical events from early exploration to modern times.",
    questions: mock4Questions
  },
  {
    id: "5",
    title: "Government & Rights Mock",
    description: "Test your knowledge on the system of government, laws, and your rights.",
    questions: mock5Questions
  }
];

export function getMockExamById(id: string): MockExamType | undefined {
  return availableMocks.find(m => m.id === id);
}
