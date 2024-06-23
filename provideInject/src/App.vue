<script setup lang="ts">
import { provide, ref } from "vue";
import List from "./components/List.vue";
import Navigation from "./components/Navigation.vue";
import { v4 as uuid4 } from "uuid";
import { Entry } from "./Entry";
import { TodoList } from "./TodoList";
import { todoListFixture } from "./TodoListFixture";
import {
    addEntryKey,
    addListKey,
    removeEntryKey,
    setActiveListKey,
    updateEntryKey,
} from "./keys";

const lists = ref<TodoList[]>(todoListFixture);
const activeList = ref<TodoList>(lists.value[0]);
const light = ref<boolean>(true);

const addList = (title: string = "New List") => {
    const newList: TodoList = { title: title, id: uuid4(), entries: [] };
    lists.value.push(newList);
    setActiveList(newList.id);
};

const addEntry = (title: string = "") => {
    activeList.value.entries.push({ id: uuid4(), completed: false, title });
};

const updateEntry = (update: Entry) => {
    const entryToUpdate = activeList.value.entries.find(
        (entry) => entry.id === update.id
    );
    if (entryToUpdate) {
        entryToUpdate.title = update.title;
        entryToUpdate.completed = update.completed;
    }
};

const removeEntry = (id: string) => {
    activeList.value.entries = activeList.value.entries.filter(
        (entry) => entry.id !== id
    );
};

const setActiveList = (id: string) => {
    const selectedList = lists.value.find((list) => list.id === id);
    if (selectedList) {
        activeList.value = selectedList;
    }
};

const toggleTheme = () => {
    light.value = !light.value;
};

provide("lists", lists);
provide("activeList", activeList);
provide(addListKey, addList);
provide(addEntryKey, addEntry);
provide(removeEntryKey, removeEntry);
provide(setActiveListKey, setActiveList);
provide(updateEntryKey, updateEntry);
</script>

<template>
    <div
        class="min-h-screen bg-base text-text"
        :class="[light ? 'latte' : 'frappe']"
    >
        <Navigation
            :is-light-theme="light"
            @toggle-theme="toggleTheme"
        ></Navigation>
        <main class="container mx-auto">
            <List />
        </main>
    </div>
</template>
