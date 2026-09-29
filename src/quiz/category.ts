import type { Category, Quiz } from "./quiz";

/**
 * import.meta.glob() で読み込む各クイズファイルの型
 *
 * 各ファイルは以下の形式で export している
 *
 * export const category = { ... };
 * export const quizList = [ ... ];
 */
interface QuizModule {
  category: {
    id: number;
    name: string;
  };
  quizList: Quiz[];
}

/**
 * quiz-dataフォルダ配下の
 * 「○○Quiz.ts」という名前のファイルを全て読み込む
 *
 * eager: true を指定しているため、
 * アプリ起動時に各モジュールを即座に読み込む
 */
const modules = import.meta.glob<QuizModule>("./quiz-data/*Quiz.ts", {
  eager: true,
});

/**
 * 読み込んだモジュールからカテゴリ一覧を生成する
 *
 * modulesの内容:
 * {
 *   "./quiz-data/historyQuiz.ts": {
 *     category: { id: 1, name: "歴史" },
 *     quizList: [...]
 *   },
 *   "./quiz-data/englishQuiz.ts": {
 *     category: { id: 2, name: "英語" },
 *     quizList: [...]
 *   }
 * }
 *
 * ↓ Object.values()で値だけを取り出す
 *
 * [
 *   {
 *     category: { id: 1, name: "歴史" },
 *     quizList: [...]
 *   },
 *   {
 *     category: { id: 2, name: "英語" },
 *     quizList: [...]
 *   }
 * ]
 *
 * ↓ map()でCategory型へ変換
 */
export const categories: Category[] = Object.values(modules).map(
  (module) => ({
    // category の id, name をコピー
    ...module.category,

    // 問題一覧を設定
    quizList: module.quizList,
  }),
);
