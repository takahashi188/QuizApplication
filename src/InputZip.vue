<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref } from "vue";
import type { Address } from "./types/Address";

const emit = defineEmits<{
  reslut: [data: Address | null];
}>();

const zip = ref<String>("");
const errorMessage = ref<string>("");

// interface Address {
//   results: {
//     address1: string;
//     address2: string;
//     address3: string;
//   };
// }

interface ApiErrorResponse {
  message: string;
  code: string;
}

const getAddress = async (): Promise<Address | null> => {
  try {
    errorMessage.value = "";

    if (!validateZip()) {
        return null;
    }

    const response = await axios.get<Address>(
      'https://zipcloud.ibsnet.co.jp/api/search',
      {
        params: {
            zipcode: zip.value
        }
      },
    );

    console.log(response);
    const address = response.data?.results;
    if (!address || address.length === 0) {
       errorMessage.value = "住所が見つかりませんでした。";
       return null;
    }
    return response.data;
  } catch (error) {
    console.log(error);
    errorMessage.value = "住所検索中にエラーが発生しました。";
    return null;
  }
};

const sendParent = async () => {
    const data = await getAddress();
    emit("reslut", data);
}

const validateZip = (): boolean => {
    if (zip.value.trim() === "") {
        errorMessage.value = "郵便番号を入力してください。";
        return false;
    } else if (!zip.value.match(/^\d+$/)) {
        errorMessage.value = "郵便番号は全て半角数字で入力してください。";
        return false;
    } else if (zip.value.trim().length !== 7) {
        errorMessage.value = "郵便番号は7桁で入力してください。";
        return false;
    }
    return true;
}
</script>

<template>
  <label>郵便番号</label>
  <input type="text" v-model="zip" />
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <button @click="sendParent">検索</button>
</template>

<style scoped></style>
