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
    <form @submit="addTask" novalidate>
        <label
            style="
                font-family: 'Courier New';
                font-size: 2vw;
                color: darkorange;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
            >Add Task
            <input
                v-model="task.name"
                class="bg-indigo-100 rounded-full w-full mb-2 px-2"
            />
        </label>
        <button
            type="submit"
            class="bg-fuchsia-400 text-white rounded-md px-2"
            style="text-shadow: 2px 4px 4px purple; font-size: 1vw"
        >
            Add
        </button>
    </form>
</template>
