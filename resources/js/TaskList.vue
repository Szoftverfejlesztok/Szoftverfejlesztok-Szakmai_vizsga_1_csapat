<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "./stores/tasks";

const store = useTaskStore();
onMounted(() => {
    store.updateTasks();
});
</script>

<template>
    <h2>Task List</h2>
    <div v-for="task in store.tasks">
        <div>{{ task.name }}</div>
    </div>
</template>

<style scoped></style>
