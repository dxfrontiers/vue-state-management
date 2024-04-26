<script setup lang="ts">
import { provide, ref } from "vue";
import List from "./components/List.vue";
import Navigation from "./components/Navigation.vue";
import { v4 as uuid4 } from "uuid";
import { TodoList } from "./TodoList.ts";
import { todoListFixture } from "./TodoListFixture.ts";

const lists = ref<TodoList[]>(todoListFixture);
const activeList = ref<TodoList>(lists.value[0]);
const light = ref<boolean>(true);

const addList = (title: string = "New List") => {
  const newList: TodoList = { title: title, id: uuid4(), entries: [] };
  lists.value.push(newList);
  setActiveList(newList.id);
};

const addEntry = (title: string) => {
  activeList.value.entries.push({ id: uuid4(), completed: false, title });
};

const setActiveList = (id: string) => {
  const selectedList = lists.value.find((list) => list.id === id);
  if (selectedList) {
    activeList.value = selectedList;
  }
};

provide("lists", lists);
provide("activeList", activeList);
provide("addList", addList);
provide("addEntry", addEntry);
provide("setActiveList", setActiveList);
provide("light", light);
</script>

<template>
  <div class="min-h-screen bg-base text-text" :class="[light ? 'latte' : 'frappe']">
    <Navigation />
    <main class="container mx-auto">
      <List />
    </main>
  </div>
</template>