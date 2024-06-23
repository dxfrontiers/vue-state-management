<script setup lang="ts">
import { ref } from "vue";
import Navigation from "./components/Navigation.vue";
import List from "./components/List.vue";
import { v4 as uuid4 } from "uuid";
import { TodoList } from "./TodoList";
import { todoListFixture } from "./TodoListFixture";
import { Entry } from "./Entry";

const lists = ref<TodoList[]>(todoListFixture);
const activeList = ref<TodoList>(lists.value[0]);
const light = ref<boolean>(true);
const showCompleted = ref<boolean>(false);

const addList = (title: string = "New List") => {
    const newList: TodoList = { title: title, id: uuid4(), entries: [] };
    lists.value.push(newList);
    activeList.value = newList;
};

const addEntry = (title: string = "") => {
    activeList.value.entries.push({ id: uuid4(), completed: false, title });
};

const removeEntry = (id: string) => {
    activeList.value.entries = activeList.value.entries.filter(
        (entry) => entry.id !== id
    );
};

const setActiveList = (id: string) => {
    activeList.value = lists.value.find((list) => list.id === id);
};

const toggleLight = () => {
    light.value = !light.value;
};

const toggleVisible = () => {
    showCompleted.value = !showCompleted.value;
};

const updateTitle = (title: string) => {
    activeList.value.title = title;
};

const onEntryUpdated = (updated: Entry) => {
    const entryToUpdate = activeList.value.entries.find(
        (entry) => entry.id === updated.id
    );

    entryToUpdate.completed = updated.completed;
    entryToUpdate.title = updated.title;
};
</script>

<template>
    <div
        class="min-h-screen bg-base text-text"
        :class="[light ? 'latte' : 'frappe']"
    >
        <Navigation
            :lists="lists"
            :activeListId="activeList.id"
            :lightMode="light"
            @setActiveList="setActiveList"
            @createList="addList"
            @toggleLight="toggleLight"
        />
        <main class="container mx-auto">
            <List
                v-if="activeList"
                :activeList="activeList"
                :showCompleted="showCompleted"
                @addEntry="addEntry"
                @remove-entry="removeEntry"
                @updateTitle="updateTitle"
                @toggleVisible="toggleVisible"
                @entry-updated="onEntryUpdated"
            />
        </main>
    </div>
</template>

<style scoped></style>
