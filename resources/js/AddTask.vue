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
        <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row mb-5">
                <input
                    v-model="task.name"
                    placeholder="Name of the task"
                    class="sm:mb-0 sm:mr-5 flex-grow"
                />
                <button
                    :disabled="!task.name"
                    type="submit"
                    class="btn-primary"
                >
                    Add new task
                </button>
            </div>
            <div>
                <VueDatePicker
                    v-model="task.deadline"
                    :enable-time-picker="false"
                    :start-time="startTime"
                    utc="preserve"
                ></VueDatePicker>
            </div>
        </div>
    </form>
</template>
