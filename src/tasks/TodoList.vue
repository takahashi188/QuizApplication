<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import TodoForm from "./TodoForm.vue";

interface Task {
  id: number;
  name: string;
  deadline: string;
  completed: boolean;
  deleted: boolean;
}

interface TaskResponse {
  content: Task[];
  number: number;
  totalPages: number;
  totalElements: number;
}

const tasks = ref<Task[]>([]);
const currentPage = ref<number>(0);
const totalPage = ref<number>(0);
const totalTask = ref<number>(0);

const taskPerPage = 5;

watch(currentPage, () => {
  getTasks();
});

const getTasks = async () => {
  try {
    const { data } = await axios.get<TaskResponse>(
      "http://localhost:8080/api/tasks",
      {
        params: {
          page: currentPage.value,
          size: taskPerPage,
        },
      },
    );
    currentPage.value = data.number;
    totalPage.value = data.totalPages;
    tasks.value = data.content;
    totalTask.value = data.totalElements;
    console.log(tasks);
  } catch (error) {
    console.log(error);
  }
};

onMounted(getTasks);

const addTask = (success: boolean) => {
  if (success) {
    if (totalTask.value / taskPerPage === totalPage.value) {
      currentPage.value = totalPage.value;
    } else {
      currentPage.value = totalPage.value - 1;
    }
  }
};

const updateCompeleted = async (id: number) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/tasks/complete/${id}`,
    );
  } catch (error) {
    console.log(error);
  }
};

const completeTask = async (id: number) => {
  await updateCompeleted(id);
  await getTasks();
};

const updateDeleted = async (id: number) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/tasks/delete/${id}`,
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id: number) => {
  await updateDeleted(id);
  if (currentPage.value > 0 && tasks.value.length === 1) {
    currentPage.value--;
  } else {
  await getTasks();
  }
};

type Status = "incomplete" | "delay" | "complete";

const getStatus = (completed: boolean, deadline: string): Status => {
  if (completed) {
    return "complete";
  }

  const deadlineDate = new Date(deadline);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (deadlineDate < today) {
    return "delay";
  }

  return "incomplete";
};

const statusLabels = {
  incomplete: "未完了",
  delay: "遅延",
  complete: "完了",
};

const showStatus = (completed: boolean, deadline: string): string => {
  return statusLabels[getStatus(completed, deadline)];
};

const addStatusClass = (completed: boolean, deadline: string): string => {
  return getStatus(completed, deadline);
};

const backPage = () => {
  currentPage.value--;
};

const nextPage = () => {
  currentPage.value++;
};
</script>

<template>
  <TodoForm @create-task="addTask" />

  <h3>タスク一覧</h3>

  <table>
    <thead>
      <tr>
        <th>タスク</th>
        <th>期限</th>
        <th>ステータス</th>
        <th>操作</th>
      </tr>
    </thead>

    <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td :class="addStatusClass(task.completed, task.deadline)">
            {{ task.name }}
          </td>
          <td :class="addStatusClass(task.completed, task.deadline)">
            {{ task.deadline }}
          </td>
          <td :class="addStatusClass(task.completed, task.deadline)">
            {{ showStatus(task.completed, task.deadline) }}
          </td>
          <td>
            <button
              class="complete-btn"
              v-if="!task.completed"
              @click="completeTask(task.id)"
            >
              完了
            </button>
            <button class="delete-btn" @click="deleteTask(task.id)">削除</button>
          </td>
        </tr>

        <tr v-if="tasks.length === 0">
          <td colspan="4">タスクなし</td>
        </tr>
    </tbody>
  </table>

  <div v-if="totalPage !== 0" class="pagination">
  <button v-if="currentPage > 0" @click="backPage" class="page-btn">前へ</button>
  <span>{{ currentPage + 1 }}/{{ totalPage }}</span>
  <button v-if="currentPage + 1 < totalPage" @click="nextPage" class="page-btn">次へ</button>
  </div>
</template>

<style scoped>
h3 {
  margin: 24px 0 16px;
  text-align: center;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #4f46e5;
  color: white;
}

th,
td {
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

tbody tr:hover {
  background-color: #f8fafc;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* ステータス表示 */
.incomplete {
  color: #374151;
  font-weight: bold;
}

.delay {
  color: #dc2626;
  font-weight: bold;
}

.complete {
  color: #2563eb;
  font-weight: bold;
}

/* ボタン共通 */
button {
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  transition: 0.2s;
}

/* 完了ボタン */
.complete-btn {
  background-color: #22c55e;
}

.complete-btn:hover {
  background-color: #16a34a;
}

/* 削除ボタン */
.delete-btn {
  background-color: #ef4444;
  margin-left: 8px;
}

.delete-btn:hover {
  background-color: #dc2626;
}

/* タスクなし */
td[colspan="4"] {
  padding: 24px;
  color: #6b7280;
  font-style: italic;
}

/* ページネーション */
button + p,
p + button {
  display: inline-block;
}

p {
  display: inline-block;
  margin: 0 16px;
  font-weight: bold;
}

button[v-if] {
  margin-top: 16px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.pagination span {
  font-weight: bold;
  font-size: 16px;
}

.page-btn {
  background-color: #2563eb;
}

.page-btn:hover {
  background-color: #4f46e5;
}
</style>
