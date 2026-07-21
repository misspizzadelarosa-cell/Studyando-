/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PDFDocument {
  id: string;
  title: string;
  week: number;
  topic: string;
  summary: string;
  content: string;
}

export interface ClinicalBlock {
  id: string;
  name: string;
  priority: 'CRÍTICA' | 'ALTA' | 'MODERADA' | 'ESTÁNDAR';
  weeks: number[];
  clinicalGoal: string;
  syllabusTopics: string[];
}

export interface Flashcard {
  id: string;
  topicId: string;
  question: string;
  answer: string;
  yield: 'HIGH-YIELD' | 'MEDIUM-YIELD';
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  type: 'SELECT_SIMPLE' | 'CLINICO_COMUNITARIO' | 'DESARROLLO_CORTO';
  topicId?: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  communityContext?: string; // APS Focus context for UCS
}

export interface StudyProgress {
  processedDocs: string[]; // List of PDFDocument ids processed
  activeBlockId: string | null;
  completedFlashcards: string[]; // List of flashcard ids reviewed
  examScores: {
    totalQuestions: number;
    correctAnswers: number;
    history: { date: string; score: number; block: string }[];
  };
}
