<script setup lang="ts">
import { defineProps, onUpdated, PropType, Ref, ref } from "vue";
import { TodoList } from "../stores/store.ts";
import Entry from "./Entry.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
   activeList: { type: Object as PropType<TodoList>, required: true },
});

const emits = defineEmits(["addEntry"]);

const showCompleted = ref<boolean>(false);
const titleInput: Ref<HTMLInputElement | null> = ref(null);

const handleAddEntry = () => {
   emits("addEntry");
};

const toggleVisible = () => {
   showCompleted.value = !showCompleted.value;
};

onUpdated(() => {
   if (props.activeList?.entries?.length === 0 && titleInput.value) {
      titleInput.value.focus();
   }
});
</script>

<template>
   <div class="mt-20 flex flex-col max-w-[700px]">
      <input
         type="text"
         class="bg-transparent focus-visible:outline-none text-4xl font-semibold h-[3rem]"
         v-model="activeList.title"
         ref="titleInput"
      />

      <ul class="mt-10">
         <Entry
            v-for="(entry, idx) in activeList.entries"
            v-show="showCompleted ? true : !entry.completed"
            :key="entry.id"
            :entry="entry"
            @add-entry="handleAddEntry"
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
            @click="handleAddEntry"
            class="rounded border-2 border-lavender p-2 bg-surface0 hover:bg-lavender font-semibold ml-5"
         >
            Add Entry
         </button>
      </div>
   </div>
</template>

<style scoped></style>
