import type { Timestamp } from "firebase/firestore";

export interface Option {
  id: number;
  option: string;
}

export interface Quiz {
  id: number;
  question: string;
  options: Option[];
  correctId: number;
}

export interface Answer {
  quiz: Quiz;
  answerId: number;
}

export interface AnswerHistory {
  answer: Answer[];
  score: number;
  correctRate: number;
  answerDate: Date;
}

export interface Category {
  id: number;
  name: string;
  quizList: Quiz[];
}

export interface RankingRequest {
  name: string;
  category: number;
  correctRate: number;
  score: number;
  numberOfQuiz: number;
  answeredDate: Date;
}

export interface RankingResponse extends Omit<RankingRequest, "answeredDate"> {
  id: string;
  answeredDate: Timestamp;
}
