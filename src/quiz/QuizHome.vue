<script setup lang="ts">
import router from "@/router/index.js";
import QuizHeader from "./QuizHeader.vue";
import { useQuizStore } from "./quizStore.ts";
import { ref } from "vue";
import type { AnswerHistory } from "./quiz.ts";
import AnswerHistoryList from "./AnswerHistoryList.vue";
import AnswerHistoryShowModal from "./AnswerHistoryShowModal.vue";

const quizStore = useQuizStore();
const error = ref<string>("");
const quizNumber = ref<number>(0);
const showHistoryModal = ref<boolean>(false);
const answerHistory = ref<AnswerHistory>();
const count = ref<number>(0);
const selectedCategory = ref<number>(quizStore.categoryNumber);

const goQuiz = () => {
  error.value = "";

  if (quizNumber.value === 0) {
    error.value = "出題数を選択してください";
    return;
  }

  if (selectedCategory.value === 0) {
    error.value = "ジャンルを選択してください";
    return;
  }

  quizStore.startGame(quizNumber.value, selectedCategory.value);
  router.push({ name: "Quiz" });
};

const setQuizNumber = (number: number) => {
  quizNumber.value = number;
};

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};

const openHistoryModal = (answer: AnswerHistory, index: number) => {
  answerHistory.value = answer;
  count.value = index + 1;
  showHistoryModal.value = true;
};

const closeHistoryModal = () => {
  showHistoryModal.value = false;
};
</script>

<template>
  <div class="quiz-home">
    <QuizHeader />

    <div class="category-select">
      <label>ジャンルを選択してください</label>
      <select v-model="selectedCategory">
        <option
          v-for="category in quizStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <p>出題数を選択してください</p>

    <div class="quiz-counts">
      <button
        v-for="count in [5, 10, 15, 20]"
        :key="count"
        class="quiz-count-button"
        :class="{
          selected: quizNumber === count,
        }"
        @click="setQuizNumber(count)"
      >
        {{ count }}問
      </button>
    </div>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <button class="start-button" @click="goQuiz">START</button>
  </div>

  <AnswerHistoryList @open="openHistoryModal" />
  <!-- <div class="history-section">
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
        @click="openHistoryModal(answerHistory, index)"
      >
        詳細を見る
      </button>
    </div>
  </div> -->

  <div>
    <AnswerHistoryShowModal
      v-if="showHistoryModal && answerHistory"
      :answer-history="answerHistory"
      :count="count"
      @close="closeHistoryModal"
    />
  </div>
</template>

<style scoped>
.quiz-home {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.quiz-home p {
  font-size: 1.2rem;
  margin-bottom: 24px;
}

.quiz-home .start-button {
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  background: #16a34a;
  color: white;
}

.quiz-home .error {
  color: red;
  margin-bottom: 16px;
}

.quiz-counts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 24px 0;
}

.quiz-count-button {
  padding: 16px;
  font-size: 1rem;
  border: 2px solid #2563eb;
  border-radius: 12px;
  background-color: white;
  color: #2563eb;
  transition: all 0.2s;
}

.quiz-count-button:hover {
  background-color: #eff6ff;
}

.quiz-count-button.selected {
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

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

.category-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-select label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.category-select select {
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #d0d7de;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.category-select select:hover {
  border-color: #4f8cff;
}

.category-select select:focus {
  outline: none;
  border-color: #4f8cff;
  box-shadow: 0 0 0 3px rgba(79, 140, 255, 0.2);
}
</style>
