<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "./stores/tasks";
import Task from "./Task.vue";

const store = useTaskStore();
onMounted(() => {
    store.getTasks();
});
</script>

<template>
    <h2>Task List</h2>
    <div v-for="task in store.tasks">
        <Task :task="task" />
    </div>
</template>
