<script setup lang="ts">
import type { AnswerHistory, Option } from "./quiz";
import { useQuizStore } from "./quizStore";

const quizStore = useQuizStore();

interface Prop {
  answerHistory: AnswerHistory;
  count: number;
}

const props = defineProps<Prop>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = () => {
  emit("close");
};

const showCorrect = (answer: number, correct: number): string => {
  return answer === correct ? "○" : "×";
};

const showAnswer = (answer: number, options: Option[]):string => {
  return answer === 0 ? "未回答" : quizStore.getOption(answer, options).option;
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>回答詳細（{{ props.count }}回目）</h2>

      <div
        v-for="(answer, index) in props.answerHistory.answer"
        :key="index"
        class="question-card"
      >
        <h4>Q{{ index + 1 }} {{ answer.quiz.question }}</h4>
        <div class="options">
          <span v-for="option in answer.quiz.options" class="option">{{
            option.option
          }}</span>
        </div>
        <p class="correct-answer">
          正解：{{
            quizStore.getOption(answer.quiz.correctId, answer.quiz.options)
              .option
          }}
        </p>
        <p
          :class="[
            'user-answer',
            answer.answerId === answer.quiz.correctId ? 'correct' : 'incorrect',
          ]"
        >
          回答：{{
            showAnswer(answer.answerId, answer.quiz.options)
          }}
          {{ showCorrect(answer.answerId, answer.quiz.correctId) }}
        </p>
      </div>

      <button class="close-button" @click="close">閉じる</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal {
  background: white;
  width: 90%;
  max-width: 800px;

  max-height: 80vh;
  overflow-y: auto;

  border-radius: 16px;
  padding: 24px;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  text-align: center;
  margin-bottom: 24px;
}

.question-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  padding: 16px;
  margin-bottom: 16px;
}

.question-card h4 {
  margin-top: 0;
  margin-bottom: 12px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.option {
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 999px;
  font-size: 0.9rem;
}

.correct-answer {
  color: #16a34a;
  font-weight: bold;
}

.user-answer.correct {
  color: #16a34a;
  font-weight: bold;
}

.user-answer.incorrect {
  color: #dc2626;
  font-weight: bold;
}

.close-button {
  width: 100%;
  padding: 14px;

  border: none;
  border-radius: 8px;

  background: #2563eb;
  color: white;

  font-size: 1rem;
  cursor: pointer;
}

.close-button:hover {
  background: #1d4ed8;
}
</style>
