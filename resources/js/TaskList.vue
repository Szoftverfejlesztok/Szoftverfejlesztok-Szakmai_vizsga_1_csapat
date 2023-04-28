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
    <h2
        style="
            font-family: 'Courier New';
            font-size: 2vw;
            color: mediumturquoise;
            font-weight: bold;
            text-shadow: 2px 4px 4px black;
        "
    >
        Task List
    </h2>
    <div v-for="task in store.unfinishedTasks">
        <Task :task="task" />
    </div>
    <div v-for="task in store.finishedTasks">
        <Task :task="task" />
    </div>
</template>
