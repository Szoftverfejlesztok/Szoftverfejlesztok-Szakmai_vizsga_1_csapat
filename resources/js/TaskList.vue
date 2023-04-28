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
    <h2 class="font-bold mb-5" v-if="store.unfinishedTasks?.length">
        My tasks
    </h2>
    <div class="mb-5">
        <div v-for="task in store.unfinishedTasks">
            <Task :task="task" />
        </div>
    </div>

    <h2 class="font-bold mb-5" v-if="store.finishedTasks?.length">
        My completed tasks
    </h2>
    <div class="mb-5">
        <div v-for="task in store.finishedTasks">
            <Task :task="task" />
        </div>
    </div>
</template>
