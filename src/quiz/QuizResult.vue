<script setup lang="ts">
import router from "@/router";
import QuizHeader from "./QuizHeader.vue";
import { useQuizStore } from "./quizStore";

const quizStore = useQuizStore();

// 再度クイズ画面へ
const startQuiz = () => {
  quizStore.reStartGame();
  router.push({ name: "Quiz" });
};

const goHome = () => {
    router.push({name: "Home"});
}
</script>

<template>
  <div class="quiz-result">
    <QuizHeader />

    <h3>結果</h3>
    <p>あなたのスコア</p>
    <p class="score">{{ quizStore.score }}/{{ quizStore.quizList.length }}</p>
    <p>{{ quizStore.quizList.length }}問中{{ quizStore.score }}問正解</p>
    <p class="rate">正答率{{ quizStore.correctRate }}%</p>

    <button class="retry-button" @click="startQuiz">もう一度始める</button>
    <button @click="goHome">ホームへ</button>
  </div>
</template>

<style scoped>
.quiz-result {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.quiz-result h3 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.score {
  font-size: 3rem;
  font-weight: bold;
  color: #2563eb;
}

.rate {
  font-size: 1.5rem;
  color: #059669;
  margin-top: 16px;
}

.retry-button {
  margin-top: 30px;
  width: 100%;
  padding: 16px;
  background: #2563eb;
  color: white;
  font-size: 1rem;
}
</style>
