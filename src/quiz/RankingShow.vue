<script setup lang="ts">
import type { Timestamp } from "firebase/firestore";
import type { RankingResponse } from "./quiz";
import { useQuizStore } from "./quizStore";
import { computed } from "vue";

const quizStore = useQuizStore();

interface Prop {
  rankingData: RankingResponse;
  rank: number;
}

const props = defineProps<Prop>();

const isNewRanking = computed(() => {
  return quizStore.rankingDataId === props.rankingData.id;
});

const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};
</script>

<template>
  <div class="ranking-card" :class="{ 'my-ranking': isNewRanking }">
    <div class="rank">
      {{ rank }}
      <span class="rank-unit">位</span>
    </div>

    <div class="ranking-info">
      <div class="name-row">
        <span class="name">
          {{ props.rankingData.name }}
        </span>

        <span v-if="isNewRanking" class="new-badge"> NEW </span>
      </div>

      <p class="date">
        {{ formatDate(props.rankingData.answeredDate) }}
      </p>

      <div class="result">
        <span class="correct-rate">
          正答率：{{ props.rankingData.correctRate }}%
        </span>

        <span class="score">
          {{ props.rankingData.score }} /
          {{ props.rankingData.numberOfQuiz }}問正解
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ranking-card {
  display: flex;
  align-items: center;

  gap: 18px;

  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: white;
}

/* 今回登録したランキング */

.ranking-card.my-ranking {
  border-color: #2563eb;

  background: #eff6ff;
}

/* 順位 */

.rank {
  min-width: 58px;

  color: #2563eb;

  font-size: 1.7rem;
  font-weight: bold;

  text-align: center;
}

.rank-unit {
  font-size: 0.9rem;
}

/* ランキング情報 */

.ranking-info {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 4px;
}

.name {
  font-size: 1.1rem;
  font-weight: bold;

  color: #111827;
}

/* NEW */

.new-badge {
  padding: 3px 8px;

  border-radius: 999px;

  background: #2563eb;
  color: white;

  font-size: 0.7rem;
  font-weight: bold;
}

/* 日付 */

.date {
  margin: 0 0 10px;

  color: #6b7280;

  font-size: 0.85rem;
}

/* 成績 */

.result {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;
}

.correct-rate {
  color: #374151;

  font-weight: bold;
}

.score {
  padding: 5px 10px;

  border-radius: 8px;

  background: #f3f4f6;

  color: #2563eb;

  font-weight: bold;
}

/* NEWのスコア */

.my-ranking .score {
  background: white;
}

@media (max-width: 600px) {
  .ranking-card {
    gap: 10px;

    padding: 12px;
  }

  .rank {
    min-width: 45px;

    font-size: 1.4rem;
  }

  .result {
    align-items: flex-start;
    flex-direction: column;

    gap: 6px;
  }
}
</style>
