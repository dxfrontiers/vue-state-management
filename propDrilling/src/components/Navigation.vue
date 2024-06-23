<script setup lang="ts">
import { PropType } from "vue";
import { Icon } from "@iconify/vue";
import { TodoList } from "../TodoList";

defineProps({
    lists: {
        type: Array as PropType<TodoList[]>,
        required: true,
    },
    activeListId: {
        type: String,
        required: true,
    },
    lightMode: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emits = defineEmits(["setActiveList", "createList", "toggleTheme"]);

function handleListSelected(id: string) {
    emits("setActiveList", id);
}

function handleAddList() {
    emits("createList");
}

function toggleLight() {
    emits("toggleTheme");
}

const openTaskCount = (list: TodoList) => {
    return list.entries.filter((entry) => !entry.completed).length;
};
</script>

<template>
    <nav class="flex gap-2 w-full pl-5 pt-5 border-b-2 border-crust bg-mantle">
        <div
            class="text-xl p-2 rounded-t-lg border-x-2 border-t-2 border-teal-600 last-of-type:border-r-2 cursor-pointer"
            :class="[activeListId === list.id ? 'bg-base' : 'bg-crust']"
            v-for="list in lists"
            :key="list.id"
            @click="handleListSelected(list.id)"
        >
            <span>{{ list.title }}</span>
            <span class="text-subtext0 ml-2 text-sm align-super">
                {{ openTaskCount(list) }}
            </span>
        </div>
        <button
            class="text-xl text-teal-600 p-3 rounded hover:bg-surface0 self-center"
            @click="handleAddList"
        >
            <Icon icon="fa6-solid:plus"></Icon>
        </button>
        <button
            @click="toggleLight"
            class="text-xl text-teal-600 p-3 rounded hover:bg-surface0 self-center"
        >
            <Icon v-if="lightMode" icon="tdesign:mode-dark"></Icon>
            <Icon v-else icon="tdesign:mode-light"></Icon>
        </button>
    </nav>
</template>
