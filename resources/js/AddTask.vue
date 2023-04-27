<script setup>
import { reactive } from "vue";
import { useTaskStore } from "./stores/tasks";

const task = reactive({ name: "" });
const store = useTaskStore();

async function addTask($event) {
    $event.preventDefault();
    try {
        await store.addTask(task);
        task.name = "";
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <h2>Add Task</h2>
    <form @submit="addTask">
        <input v-model="task.name" />
        <button type="submit" class="bg-slate-600 text-white rounded-md px-2">
            Add
        </button>
    </form>
</template>

<style scoped></style>
