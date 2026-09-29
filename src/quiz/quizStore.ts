import { defineStore } from "pinia";
import type { AnswerHistory, Category, Option, Quiz } from "./quiz";
import { ref, computed, watch } from "vue";
// import { quizzes } from "./quizList";
import type { Answer } from "./quiz";
import router from "@/router";
import { categories } from "./category";

export const useQuizStore = defineStore("quizStore", () => {
  const count = ref<number>(0);
  const quizList = ref<Quiz[]>([]);
  const answers = ref<Answer[]>([]);
  const numberOfQuiz = ref<number>(0);
  const answerHistory = ref<AnswerHistory[]>([]);
  const categoryNumber = ref<number>(0);

  const unansweredId = 0;
  const timeoutTime = 5000;
  const intervalTime = 100;
  const remainMs = ref<number>(timeoutTime);

  // 現在の表示する問題
  const currentQuiz = computed(() => {
    const quiz = quizList.value[count.value];

    if (!quiz) return null;

    return quiz;
  });

  // 正答数
  const score = computed(() => {
    return answers.value.filter(
      (answer) => answer.answerId === answer.quiz.correctId,
    ).length;
  });

  // 回答完了フラグ
  const isFinished = computed(() => {
    return answers.value.length === quizList.value.length;
  });

  // 正答率
  const correctRate = computed(() => {
    if (quizList.value.length === 0) return 0;

    return Math.ceil((score.value / quizList.value.length) * 100);
  });

  // 回答完了フラグを監視
  watch(isFinished, () => {
    // 回答の配列が初期化されていないときに結果の画面へ
    if (isFinished.value && answers.value.length !== 0) {
      setAnswerHistory();
      router.push({ name: "Result" });
    }
  });

  // 現在の問題を監視
  watch(currentQuiz, () => {
    if (currentQuiz.value) {
      resetTimer();
      startTimer();
    }
  });

  watch(remainMs, () => {
    if (remainMs.value === 0 && currentQuiz.value) {
      answer(currentQuiz.value.id, unansweredId);
    }
  });

  // タイマーIDを保持する変数
  let interval: ReturnType<typeof setInterval>;

  // タイマーの開始処理
  const startTimer = () => {
    // 時間制限表示用の処理
    interval = setInterval(() => {
      remainMs.value = Math.max(0, remainMs.value - intervalTime);
    }, intervalTime);
  };

  // 制限時間表示バー用の値
  const timerPercent = computed(() => {
    return (remainMs.value / timeoutTime) * 100;
  });

  // 制限時間表示用（テキスト）の値
  const remainSeconds = computed(() => {
    return (remainMs.value / 1000).toFixed(1);
  });

  // タイマーのリセット
  const resetTimer = () => {
    clearInterval(interval);
    remainMs.value = timeoutTime;
  };

  // 回答処理
  const answer = (quizId: number, answerId: number) => {
    resetTimer();
    const quizData = quizList.value.find((quiz) => quizId === quiz.id);

    if (!quizData) {
      return;
    }

    answers.value.push({ quiz: quizData, answerId: answerId });
    count.value++;
  };

  // 回答のリセット
  const resetAnswer = () => {
    answers.value = [];
  };

  // 問題カウントのリセット
  const resetCount = () => {
    count.value = 0;
  };

  // クイズを再度始める際の処理
  const reStartGame = () => {
    resetAnswer();
    resetCount();
    setQuizList();
  };

  // 出題数の設定
  const setNumberOfQuiz = (number: number) => {
    numberOfQuiz.value = number;
  };

  // ジャンルの設定
  const setCategoryNumber = (number: number) => {
    categoryNumber.value = number;
  };

  // 問題の配列の設定
  const setQuizList = () => {
    const selectedQuizList =
      categories.find((category) => categoryNumber.value === category.id)
        ?.quizList ?? [];

    quizList.value = shuffle(selectedQuizList)
      .slice(0, numberOfQuiz.value)
      .map((quiz) => ({
        ...quiz,
        options: shuffle(quiz.options),
      }));
  };

  // クイズを最初に始める際の処理
  const startGame = (numberOfQuiz: number, category: number) => {
    resetCount();
    resetAnswer();
    setNumberOfQuiz(numberOfQuiz);
    setCategoryNumber(category);
    setQuizList();
  };

  // 配列をランダムに並び替える
  const getRandomElements = <T>(array: T[], count: number): T[] => {
    if (count > array.length) {
      return [];
    }

    const result: T[] = [];
    const usedIndices: Set<number> = new Set();

    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * array.length);

      // 既に同じ要素が格納されている場合、追加しない
      if (usedIndices.has(randomIndex)) {
        continue;
      }

      const selectedQuiz = array[randomIndex];

      // インデックスに対応する要素がない場合、追加しない
      if (!selectedQuiz) {
        continue;
      }

      usedIndices.add(randomIndex);
      result.push(selectedQuiz);
    }

    return result;
  };

  // 配列の並び順をランダム化
  const shuffle = <T>(array: T[]): T[] => {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const current = result[i]!;
      const next = result[j]!;

      [result[i], result[j]] = [next, current];
    }

    return result;
  };

  // 回答履歴を登録
  const setAnswerHistory = () => {
    answerHistory.value.push({
      answer: answers.value,
      score: score.value,
      correctRate: correctRate.value,
      answerDate: new Date(),
    });
  };

  // 選択肢を取得
  const getOption = (id: number, options: Option[]): Option => {
    return options.find((option) => id === option.id)!;
  };

  return {
    categories,
    quizList,
    count,
    numberOfQuiz,
    currentQuiz,
    score,
    correctRate,
    isFinished,
    answerHistory,
    timerPercent,
    remainMs,
    remainSeconds,
    timeoutTime,
    categoryNumber,
    answer,
    startGame,
    reStartGame,
    setAnswerHistory,
    getOption,
  };
});
