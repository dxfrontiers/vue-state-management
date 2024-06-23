<script setup lang="ts">
import { PropType } from "vue";
import Entry from "./Entry.vue";
import { Entry as EntryType } from "../Entry";
import { Icon } from "@iconify/vue";
import { TodoList } from "../TodoList";

defineProps({
    activeList: {
        type: Object as PropType<TodoList>,
        required: true,
    },
    showCompleted: {
        type: Boolean,
        required: true,
    },
});

const emits = defineEmits([
    "addEntry",
    "removeEntry",
    "updateTitle",
    "entryUpdated",
    "toggleVisible",
]);

const onAddEntry = () => {
    emits("addEntry");
};

const onRemoveEntry = (id: string) => {
    emits("removeEntry", id);
};

const onEntryUpdated = (updated: EntryType) => {
    emits("entryUpdated", updated);
};

const updateTitle = (event: Event) => {
    emits("updateTitle", (event.target as HTMLInputElement).value);
};

const toggleVisible = () => {
    emits("toggleVisible");
};
</script>

<template>
    <div class="mt-20 flex flex-col max-w-[700px]">
        <input
            type="text"
            class="bg-transparent focus-visible:outline-none text-4xl font-semibold h-[3rem]"
            :value="activeList.title"
            @input="updateTitle"
        />
        <ul class="mt-10">
            <Entry
                v-for="(entry, idx) in activeList.entries"
                v-show="showCompleted || !entry.completed"
                @add-entry="onAddEntry"
                @remove-entry="onRemoveEntry"
                @entry-updated="onEntryUpdated"
                :key="entry.id"
                :entry="entry"
                :last-element="idx === activeList.entries.length - 1"
            />
        </ul>
        <div class="flex mt-5 w-full justify-end">
            <button
                @click="toggleVisible"
                title="Toggle visibility of completed items"
                class="ml-0"
            >
                <Icon
                    icon="gridicons:visible"
                    height="2em"
                    v-if="showCompleted"
                ></Icon>
                <Icon icon="gridicons:not-visible" height="2em" v-else></Icon>
            </button>

            <button
                @click="onAddEntry"
                class="rounded border-2 border-lavender p-2 bg-surface0 hover:bg-lavender font-semibold ml-5"
            >
                Add Entry
            </button>
        </div>
    </div>
</template>

<style scoped></style>
