<script setup lang="ts">
import { ref, reactive } from "vue";
import Form from "./Form.vue";
import Counter from "./Counter.vue";

type User = {
  name: string;
  age: number;
};

const form: User = reactive({
  name: "",
  age: 0,
});

const showResult = () => {
  console.log(form);
};

const handleChange = (event: Event) => {
  console.log((event.target as HTMLInputElement).value);
};

interface ResponseValue {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const getApi = async (id: number) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = (await response.json()) as ResponseValue;
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <form @submit.prevent="showResult">
    <Form v-model="form" />
    <button>送信</button>
  </form>

  <input type="text" @change="handleChange" />

  <Counter :initial-count="5" />

  <button @click="getApi(100)">API取得</button>
</template>

<style scoped></style>
