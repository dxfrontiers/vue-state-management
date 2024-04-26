<script setup lang="ts">
import { defineProps, PropType, watch, ref } from "vue";
import { Entry } from "../TodoList";

const { entry } = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});

const completed = ref(entry.completed);
const title = ref(entry.title);

watch(completed, (newVal) => {
  entry.completed = newVal;
});

watch(title, (newVal) => {
  entry.title = newVal;
});
</script>

<template>
  <li class="flex gap-4 text-2xl mt-1">
    <input type="checkbox" v-model="completed" />
    <input
        type="text"
        v-model="title"
        class="bg-transparent focus-visible:outline-none flex-1"
        :class="{ 'line-through text-overlay1': entry.completed }"
    />
  </li>
</template>

<style scoped></style>