<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { Entry, useListStore } from "../stores/store";

const { entry, lastElement } = defineProps({
    entry: { type: Object as PropType<Entry>, required: true },
    lastElement: Boolean,
});

const title = ref(entry.title);
const completed = ref(entry.completed);

const listStore = useListStore();
const { addEntry, removeEntry, updateEntry } = listStore;

const vFocus = {
    mounted: (el: HTMLElement) => {
        if (lastElement) {
            el.focus();
        }
    },
};

watch(completed, (newVal) => {
    const updated: Entry = {
        id: entry.id,
        title: title.value,
        completed: newVal,
    };
    updateEntry(updated);
});

watch(title, (newVal) => {
    const updated: Entry = {
        id: entry.id,
        title: newVal,
        completed: completed.value,
    };
    updateEntry(updated);
});
</script>

<template>
    <li class="flex gap-4 text-2xl mt-1">
        <input type="checkbox" v-model="entry.completed" />
        <input
            type="text"
            v-model="title"
            v-focus
            @focusout="title === '' && removeEntry(entry.id)"
            @keyup.enter="addEntry()"
            class="bg-transparent focus-visible:outline-none flex-1"
            :class="{ 'line-through text-overlay1': completed }"
        />
    </li>
</template>

<style scoped></style>
