<script setup lang="ts">
import type { Quiz } from "./quiz";

interface Prop {
  quiz: Quiz | null;
}
defineProps<Prop>();

const emit = defineEmits<{
  (e: "answerQuiz", quizId: number, answerId: number): void;
  (e: "beckHome"): void;
}>();

const nextQuiz = (quizId: number, id: number) => {
  emit("answerQuiz", quizId, id);
};

const backHome = () => {
  emit("beckHome");
};
</script>

<template>
  <div v-if="quiz" class="quiz-card">
    <h3>{{ quiz.question }}</h3>

    <div class="quiz-options">
      <button
        class="quiz-option"
        v-for="(option, index) in quiz.options"
        :key="index"
        @click="nextQuiz(quiz.id, option.id)"
      >
        {{ option.option }}
      </button>
    </div>
  </div>

  <div v-else>
    <button class="home-button" @click="backHome">ホームへ</button>
  </div>
</template>

<style scoped>
.quiz-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.quiz-card h3 {
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
}

.quiz-options {
  display: grid;
  gap: 12px;
}

.quiz-option {
  padding: 14px;
  background: #eef2ff;
  color: #333;
  font-size: 1rem;
}

.quiz-option:hover {
  background: #dbeafe;
}

.home-button {
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  background: #6b7280;
  color: white;
}
</style>
