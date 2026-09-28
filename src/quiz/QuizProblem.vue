<script setup lang="ts">
import router from "@/router/index.ts";
import QuizHeader from "./QuizHeader.vue";
import QuizPreview from "./QuizPreview.vue";
import { useQuizStore } from "./quizStore.ts";

const quizStore = useQuizStore();

// 回答処理
const answerQuiz = (quizId: number, answerId: number) => {
  quizStore.answer(quizId, answerId);
};

const backHome = () => {
  router.push({ name: "Home" });
};
</script>

<template>
  <div class="quiz-problem">
    <QuizHeader />

    <p class="progress">
      問題{{ quizStore.count + 1 }}/{{ quizStore.quizList.length }}
    </p>

    <p>残り時間</p>
    <p>{{ quizStore.remainSeconds }}秒</p>

    <div class="timer-bar">
      <div
        class="timer-bar-fill"
        :class="{ reset: quizStore.remainMs === quizStore.timeoutTime }"
        :style="{
          width: `${quizStore.timerPercent}%`,
        }"
      ></div>
    </div>

    <QuizPreview
      :quiz="quizStore.currentQuiz"
      @answer-quiz="answerQuiz"
      @beck-home="backHome"
    />
  </div>
</template>

<style scoped>
.quiz-problem {
  max-width: 700px;
  margin: 30px auto;
  padding: 30px;
}

.progress {
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.timer-bar {
  width: 100%;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;

  margin-top: 8px;
}

.timer-bar-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.1s linear;
}

.timer-bar-fill.reset {
  transition: none;
}
</style>
