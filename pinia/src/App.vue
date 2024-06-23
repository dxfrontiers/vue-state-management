<script setup lang="ts">
import { ref } from "vue";
import List from "./components/List.vue";
import Navigation from "./components/Navigation.vue";
import { useListStore } from "./stores/store";

const listStore = useListStore();

const light = ref<boolean>(true);
</script>

<template>
    <div
        class="min-h-screen bg-base text-text"
        :class="[light ? 'latte' : 'frappe']"
    >
        <Navigation :light-mode="light" @toggle-theme="light = !light" />
        <main class="container mx-auto">
            <List />
        </main>
    </div>
</template>

<style scoped></style>
