<script setup lang="ts">
import router from "@/router";
import QuizHeader from "./QuizHeader.vue";
import { useQuizStore } from "./quizStore";
import { ref } from "vue";
import RankingModal from "./RankingModal.vue";

const quizStore = useQuizStore();

const showRankingModal = ref<boolean>(false);

// 再度クイズ画面へ
const startQuiz = () => {
  quizStore.reStartGame();
  router.push({ name: "Quiz" });
};

const goHome = () => {
    router.push({name: "Home"});
}

const openRankingModal = () => {
  showRankingModal.value = true;
}

const closeRankingModal = () => {
  showRankingModal.value = false;
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
    <button class="ranking-button" @click="openRankingModal">ランキングを見る</button>
    <button @click="goHome">ホームへ</button>
  </div>

  <RankingModal v-if="showRankingModal" @close="closeRankingModal" />
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

.ranking-button {
  background: none;
  border: none;
  padding: 0;

  color: #2563eb;
  font-size: 0.95rem;

  cursor: pointer;
}

.ranking-button:hover {
  color: #1d4ed8;
}

.ranking-button:active {
  color: #1e40af;
}
</style>
