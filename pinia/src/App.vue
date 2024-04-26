<script setup lang="ts">
import { ref } from "vue";
import List from "./components/List.vue";
import Navigation from "./components/Navigation.vue";
import { storeToRefs } from "pinia";
import { useListStore } from "./stores/store.ts";

const listStore = useListStore();
const { lists, activeList } = storeToRefs(listStore);

const light = ref<boolean>(true);

const addList = (title: string = "New List") => {
  listStore.addList(title);
};

const addEntry = (title: string) => {
  listStore.addEntry(title);
};

const setActiveList = (id: string) => {
  listStore.setActiveList(id);
};

const handleAddEntry = (title = "") => {
  addEntry(title);
};
</script>

<template>
   <div
      class="min-h-screen bg-base text-text"
      :class="[light ? 'latte' : 'frappe']"
   >
      <Navigation
         :lists="lists"
         :active-list="activeList.id"
         @set-active-list="setActiveList"
         @create-list="addList"
         :light-mode="light"
         @toggle-light="light = !light"
      />
      <main class="container mx-auto">
         <List :activeList="activeList" @addEntry="handleAddEntry" />
      </main>
   </div>
</template>

<style scoped></style>
