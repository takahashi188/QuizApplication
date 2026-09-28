export interface Option {
    id: number,
    option: string
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