<script setup lang="ts">
import { inject, PropType } from "vue";
import { Entry } from "../Entry.ts";

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
  lastElement: Boolean,
});

const addEntry = inject("addEntry", () => {});

const vFocus = {
  mounted: (el: HTMLElement) => {
    if (props.lastElement) {
      el.focus();
    }
  },
};
</script>

<template>
  <li class="flex gap-4 text-2xl mt-1">
    <input type="checkbox" v-model="entry.completed" />
    <input
        type="text"
        v-focus
        v-model="entry.title"
        @keyup.enter="addEntry"
        class="bg-transparent focus-visible:outline-none flex-1"
        :class="{ 'line-through text-overlay1': entry.completed }"
    />
  </li>
</template>

<style scoped></style>