<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
    initialCount: 0
})

// const {initialCount = 0} = defineProps<Props>();

const count = ref<number>(props.initialCount);

const addCount = () => {
    count.value++;
}
</script>

<template>
<p>現在値：{{ count }}</p>
<button @click="addCount">+</button>
</template>

<style scoped>
</style>