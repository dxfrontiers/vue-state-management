<script setup lang="ts">
import { inject } from "vue";
import { Icon } from "@iconify/vue";
import { TodoList } from "../TodoList.ts";

const lists = inject("lists");
const activeList = inject("activeList");
const setActiveList = inject("setActiveList");
const createList = inject("addList");
const toggleLight = inject("light");

const handleListChanged = (id: string) => {
  setActiveList(id);
};

const handleNew = () => {
  createList();
};

const openTaskCount = (list: TodoList) => {
  return list.entries.filter((entry) => !entry.completed).length;
};
</script>

<template>
  <nav class="flex gap-2 w-full pl-5 pt-5 border-b-2 border-crust bg-mantle">
    <div
        class="text-xl p-2 rounded-t-lg border-x-2 border-t-2 border-teal-600 last-of-type:border-r-2 cursor-pointer"
        :class="[activeList.id === list.id ? 'bg-base' : 'bg-crust']"
        v-for="list in lists"
        :key="list.id"
        @click="handleListChanged(list.id)"
    >
      <span>{{ list.title }}</span>
      <span class="text-subtext0 ml-2 text-sm align-super">{{ openTaskCount(list) }}</span>
    </div>
    <button
        class="text-xl text-teal-600 p-3 rounded hover:bg-surface0 self-center"
        @click="handleNew"
    >
      <Icon icon="fa6-solid:plus"></Icon>
    </button>
    <button
        @click="toggleLight = !toggleLight"
        class="text-xl text-teal-600 p-3 rounded hover:bg-surface0 self-center"
    >
      <Icon icon="tdesign:mode-dark" v-if="toggleLight"></Icon>
      <Icon icon="tdesign:mode-light" v-else></Icon>
    </button>
  </nav>
</template>

<style scoped></style>