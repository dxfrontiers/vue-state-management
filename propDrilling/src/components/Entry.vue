<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { Entry } from "../Entry";

const { entry, lastElement } = defineProps({
    entry: {
        type: Object as PropType<Entry>,
        required: true,
    },
    lastElement: Boolean,
});

const emit = defineEmits(["addEntry", "removeEntry", "entryUpdated"]);

const completed = ref(entry.completed);
const title = ref(entry.title);

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
    emit("entryUpdated", updated);
});

watch(title, (newVal) => {
    const updated: Entry = {
        id: entry.id,
        title: newVal,
        completed: completed.value,
    };
    emit("entryUpdated", updated);
});

const addEntry = () => {
    emit("addEntry");
};

const removeEntry = () => {
    emit("removeEntry", entry.id);
};
</script>

<template>
    <li class="flex gap-4 text-2xl mt-1">
        <!--        -->
        <input type="checkbox" v-model="completed" />
        <input
            type="text"
            v-model="title"
            v-focus
            @focusout="title === '' && removeEntry()"
            @keyup.enter="addEntry()"
            class="bg-transparent focus-visible:outline-none flex-1"
            :class="{ 'line-through text-overlay1': completed }"
        />
    </li>
</template>

<style scoped></style>
