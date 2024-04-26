<script setup lang="ts">
import { ref } from "vue";
import Navigation from "./components/Navigation.vue";
import List from "./components/List.vue";
import { v4 as uuid4 } from "uuid";
import { TodoList } from "./TodoList";
import { todoListFixture } from "./TodoListFixture";

const lists = ref<TodoList[]>(todoListFixture);
const activeListId = ref<string>(lists.value[0].id);
const light = ref<boolean>(true);
const showCompleted = ref<boolean>(false);

const getActiveList = () => lists.value.find((list) => list.id === activeListId.value);

const addList = (title: string = "New List") => {
  const newList: TodoList = { title: title, id: uuid4(), entries: [] };
  lists.value.push(newList);
  activeListId.value = newList.id;
};

const addEntry = (title: string) => {
  const activeList = getActiveList();
  if (activeList) {
    activeList.entries.push({ id: uuid4(), completed: false, title });
  }
};

const setActiveList = (id: string) => {
  activeListId.value = id;
};

const toggleLight = () => {
  light.value = !light.value};

const toggleVisible = () => {
  showCompleted.value = !showCompleted.value;
};

const updateTitle = (title: string) => {
  const activeList = getActiveList();
  if (activeList) {
    activeList.title = title;
  }
};
</script>

<template>
  <div class="min-h-screen bg-base text-text" :class="[light ? 'latte' : 'frappe']">
    <Navigation
        :lists="lists"
        :activeListId="activeListId"
        :lightMode="light"
        @setActiveList="setActiveList"
        @createList="addList"
        @toggleLight="toggleLight"
    />
    <main class="container mx-auto">
      <List
          v-if="getActiveList()"
          :activeList="getActiveList()"
          :showCompleted="showCompleted"
          @addEntry="addEntry"
          @updateTitle="updateTitle"
          @toggleVisible="toggleVisible"
      />
    </main>
  </div>
</template>

<style scoped></style>