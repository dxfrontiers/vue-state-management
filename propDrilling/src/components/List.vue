<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import Entry from "./Entry.vue";
import { Icon } from "@iconify/vue";
import { TodoList } from "../TodoList";

const props = defineProps({
  activeList: {
    type: Object as PropType<TodoList>,
    required: true,
  },
  showCompleted: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["addEntry", "updateTitle", "toggleVisible"]);

const titleInput = ref<string>("");

const addEntry = () => {
  if (titleInput.value.trim() !== "") {
    emits("addEntry", titleInput.value);
    titleInput.value = ""; // Clear the input after adding
  }
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
    <input
        type="text"
        v-model="titleInput"
        @keyup.enter="addEntry"
        placeholder="Add new entry..."
        class="mt-2 p-2 border rounded"
    />
    <ul class="mt-10">
      <Entry
          v-for="entry in activeList.entries"
          v-show="showCompleted || !entry.completed"
          :key="entry.id"
          :entry="entry"
      />
    </ul>
    <div class="flex mt-5 w-full justify-end">
      <button @click="toggleVisible" title="Toggle visibility of completed items" class="ml-0">
        <Icon icon="gridicons:visible" height="2em" v-if="showCompleted"></Icon>
        <Icon icon="gridicons:not-visible" height="2em" v-else></Icon>
      </button>
    </div>
  </div>
</template>

<style scoped></style>