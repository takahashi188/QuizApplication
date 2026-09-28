<script setup lang="ts">
import type { AnswerHistory } from './quiz';
import { useQuizStore } from './quizStore';

const quizStore = useQuizStore();

const emit = defineEmits<{
    (e: "open", answer: AnswerHistory, index: number):void;
}>()

const open = (answer: AnswerHistory, index: number) => {
    emit("open", answer, index);
}

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};
</script>

<template>
<div class="history-section">
    <h3>回答履歴</h3>

    <div
      v-for="(answerHistory, index) in quizStore.answerHistory"
      :key="index"
      class="history-card"
    >
      <div class="history-header">
        <span>{{ index + 1 }}回目</span>
        <span class="history-rate"
          >正答率：{{ answerHistory.correctRate }}%</span
        >
      </div>

      <p class="history-date">{{ formatDate(answerHistory.answerDate) }}</p>
      <p class="history-score">
        {{ answerHistory.score }}/{{ answerHistory.answer.length }}
      </p>

      <div class="score-bar">
        <div
          class="score-bar-fill"
          :style="{
            width: `${answerHistory.correctRate}%`,
          }"
        ></div>
      </div>

      <button
        class="history-button"
        @click="open(answerHistory, index)"
      >
        詳細を見る
      </button>
    </div>
  </div>
</template>

<style scoped>
.history-section {
  max-width: 800px;
  margin: 40px auto;
}

.history-section h3 {
  text-align: center;
  margin-bottom: 24px;
}

.history-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: bold;
}

.history-rate {
  color: #2563eb;
}

.history-date {
  color: #666;
  font-size: 0.9rem;
}

.history-score {
  margin: 12px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.history-button {
  background: none;
  border: none;
  padding: 0;

  color: #2563eb;
  font-size: 0.95rem;

  cursor: pointer;
}

.history-button:hover {
  color: #1d4ed8;
}

.history-button:active {
  color: #1e40af;
}

.score-bar {
  width: 100%;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;

  margin-top: 8px;
}

.score-bar-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}
</style>