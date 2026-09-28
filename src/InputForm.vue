<script setup lang="ts">
import InputZip from './InputZip.vue';
import { ref } from 'vue';
import { type Address } from './types/Address.ts';

const address = ref<string>("");

const showAddress = (data: Address| null) => {
    if (isAddress(data)) {
        const result = data.results[0];
        if (!result) {
            return;
        }
        address.value = result.address1 + result.address2 + result.address3; 
    } else {
        address.value = "";
    }
}

const isAddress = (value: unknown): value is Address => {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as Address).results) &&
    (value as Address).results.every(
      (item) =>
        typeof item.address1 === "string" &&
        typeof item.address2 === "string" &&
        typeof item.address3 === "string"
    )
  );
};
</script>

<template>
<InputZip @reslut="showAddress" />

<label>住所</label>
<input type="text" v-model="address">
</template>

<style scoped>
</style>