<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";

const emit = defineEmits<{
  createTask: [success: boolean];
}>();

interface TaskForm {
  name: string;
  deadline: string;
}

interface Error {
  name?: string;
  deadline?: string;
  form?: string;
}

const createForm: TaskForm = reactive({
  name: "",
  deadline: "",
});
const errorMessage: Error = reactive({});

const createTask = async () => {
  try {
    if (!validateForm()) {
      emit("createTask", false);
      return;
    }
    await axios.post("http://localhost:8080/api/tasks", createForm);
    clearCreateForm();
    emit("createTask", true);
  } catch (error) {
    console.log(error);
    errorMessage.form = "登録処理が正常に行われませんでした";
    emit("createTask", false);
  }
};

const validateForm = (): boolean => {
  clearError();

  if (createForm.name.trim() === "") {
    errorMessage.name = "タスク名を入力してください";
  }
  if (createForm.name.trim().length > 50) {
    errorMessage.name = "タスク名を５０文字以内で入力してください";
  }
  if (!createForm.deadline) {
    errorMessage.deadline = "期限を入力してください";
  } else {
    const deadline = new Date(createForm.deadline);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadline < today) {
      errorMessage.deadline = "期限は今日以降の日付を入力してください";
    }
  }

  return Object.values(errorMessage).every((message) => message === "");
};

const clearError = () => {
  errorMessage.name = "";
  errorMessage.deadline = "";
  errorMessage.form = "";
};

const clearCreateForm = () => {
  createForm.name = "";
  createForm.deadline = "";
}
</script>

<template>
  <div class="form-container">
    <label>タスク</label>
    <input type="text" v-model="createForm.name" />
    <p v-if="errorMessage.name">{{ errorMessage.name }}</p>
    <label>期限</label>
    <input type="date" v-model="createForm.deadline" />
    <p v-if="errorMessage.deadline">{{ errorMessage.deadline }}</p>
    <p v-if="errorMessage.form">{{ errorMessage.form }}</p>
    <button @click="createTask">追加</button>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 4px;
}

label {
  display: block;
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: bold;
  color: #374151;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 10px 12px;

  border: 1px solid #d1d5db;
  border-radius: 6px;

  font-size: 14px;
  box-sizing: border-box;

  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
}

p {
  margin: 4px 0 0;
  color: #dc2626;
  font-size: 13px;
}

button {
  margin-top: 12px;
  padding: 10px 20px;

  border: none;
  border-radius: 6px;

  background-color: #4f46e5;
  color: white;

  font-size: 14px;
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;
}

button:hover {
  background-color: #4338ca;
}

button:active {
  transform: scale(0.98);
}
</style>
