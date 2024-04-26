<script setup lang="ts">
import { PropType } from "vue";
import { Entry } from "../stores/store.ts";

const props = defineProps({
   entry: { type: Object as PropType<Entry>, required: true },
   lastElement: Boolean,
});

const emit = defineEmits(["addEntry"]);

const vFocus = {
   mounted: (el: HTMLElement) => {
      if (props.lastElement) {
         el.focus();
      }
   },
};

const addEntry = () => {
   emit("addEntry");
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
