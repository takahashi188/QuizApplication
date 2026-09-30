<script setup lang="ts">
import { useQuizStore } from "./quizStore.ts";
import { ref, watch } from "vue";
import RankingShow from "./RankingShow.vue";

const quizStore = useQuizStore();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const categoryNumber = ref<number>(1);
const numberOfQuiz = ref<number>(5);
// let rank = 1;

watch(
  [numberOfQuiz, categoryNumber],
  async () => {
    console.log("watch");
    await quizStore.getResults(categoryNumber.value, numberOfQuiz.value);
  },
  { immediate: true },
);

const closeModal = () => {
  emit("close");
};

// const getRank = (index: number): number => {
//   console.log(index);
//   if (
//     index > 0 &&
//     quizStore.ranking[index]?.correctRate !==
//       quizStore.ranking[index - 1]?.correctRate
//   ) {
//     rank.value = index + 1;
//   }
//   return rank.value;
// };

const getRank = (index: number): number => {
  const correctRate = quizStore.ranking[index]?.correctRate;

  return (
    quizStore.ranking.findIndex(
      (ranking) => ranking.correctRate === correctRate,
    ) + 1
  );
};

const getCategoryName = (): string => {
  return (
    quizStore.categories.find(
      (category) => categoryNumber.value === category.id,
    )?.name ?? ""
  );
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>ランキング（{{ getCategoryName() }}）</h2>

      <div class="filters">
        <div class="filter-item">
          <label>ジャンル</label>
          <select v-model="categoryNumber">
            <option
              v-for="category in quizStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="filter-item">
          <label>問題数</label>
          <select v-model="numberOfQuiz">
            <option
              v-for="(quizNumber, index) in quizStore.numberOfQuizzes"
              :key="index"
              :value="quizNumber"
            >
              {{ quizNumber }}問
            </option>
          </select>
        </div>
      </div>

      <div class="ranking-list">
        <RankingShow
          v-for="(ranking, index) in quizStore.ranking"
          :key="ranking.id"
          :ranking-data="ranking"
          :rank="getRank(index)"
        />
      </div>

      <p v-if="quizStore.ranking.length === 0" class="no-data">データなし</p>

      <button class="close-button" @click="closeModal">閉じる</button>
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

  margin-top: 0;
  margin-bottom: 24px;
}

/* 絞り込み */

.filters {
  display: flex;
  gap: 16px;

  margin-bottom: 24px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  flex: 1;
}

.filter-item label {
  font-size: 0.9rem;
  font-weight: bold;

  color: #374151;
}

.filter-item select {
  width: 100%;

  padding: 10px 12px;

  border: 1px solid #d1d5db;
  border-radius: 8px;

  background: white;

  font-size: 1rem;

  cursor: pointer;
}

.filter-item select:focus {
  border-color: #2563eb;
  outline: none;

  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

/* ランキング */

.ranking-list {
  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-bottom: 24px;
}

/* データなし */

.no-data {
  padding: 32px 0;

  text-align: center;

  color: #6b7280;

  background: #f9fafb;

  border-radius: 12px;

  margin-bottom: 24px;
}

/* 閉じる */

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

@media (max-width: 600px) {
  .modal {
    padding: 16px;
  }

  .filters {
    flex-direction: column;
  }
}
</style>
