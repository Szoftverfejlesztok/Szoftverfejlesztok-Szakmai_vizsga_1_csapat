<script setup>
import { reactive, ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useTaskStore } from "./stores/tasks";

const task = reactive({ name: "", deadline: null });
const store = useTaskStore();

async function addTask($event) {
    $event.preventDefault();
    if (!task.name) {
        return;
    }

    try {
        await store.addTask(task);
        task.name = "";
        task.deadline = null;
    } catch (e) {
        console.error(e);
    }
}

const startTime = ref({ hours: 0, minutes: 0 });
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
            <input v-model="task.name" />
        </label>
        <div>
            <VueDatePicker
                v-model="task.deadline"
                :enable-time-picker="false"
                :start-time="startTime"
                utc="preserve"
            ></VueDatePicker>
        </div>
        <button
            :disabled="!task.name"
            type="submit"
            class="bg-fuchsia-400 disabled:bg-slate-50 text-white rounded-md px-2 bg-gradient-to-r from-blue-500"
            style="text-shadow: 2px 4px 4px purple; font-size: 1vw"
        >
            Add
        </button>
    </form>
</template>
