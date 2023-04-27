<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "./stores/tasks";

const { task } = defineProps(["task"]);

const store = useTaskStore();

async function onCheck($event) {
    if ($event.target.checked) {
        $event.target.checked = false;
        await store.doneTask(task.id);
    } else {
        $event.target.checked = true;
        await store.undoneTask(task.id);
    }
}
</script>

<template>
    <label>
        <input
            type="checkbox"
            :id="task.id"
            :checked="task.done"
            @input="onCheck"
        />
        {{ task.name }}
    </label>
</template>

<style scoped></style>
