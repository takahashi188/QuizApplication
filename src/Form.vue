<script setup lang="ts">
type ModelValue = {
    name: string,
    age: number
}

const form = defineModel<ModelValue>({required: true})
</script>

<template>
    <label>名前</label>
    <input type="text" v-model="form.name" />
    <label>年齢</label>
    <input type="number" v-model="form.age" />
</template>

<style scoped></style>
