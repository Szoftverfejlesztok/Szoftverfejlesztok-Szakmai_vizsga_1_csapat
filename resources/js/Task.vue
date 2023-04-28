<script setup>
import { useTaskStore } from "./stores/tasks";

const props = defineProps(["task"]);

const store = useTaskStore();

async function onCheck($event) {
    if ($event.target.checked) {
        $event.target.checked = false;
        await store.doneTask(props.task.id);
    } else {
        $event.target.checked = true;
        await store.undoneTask(props.task.id);
    }
}

async function onDelete() {
    await store.deleteTask(props.task.id);
}
</script>

<template>
    <div>
        <label>
            <input
                type="checkbox"
                :id="props.task.id"
                :checked="props.task.done"
                @input="onCheck"
            />
            {{ props.task.name }}
        </label>
        <div role="button" @click="onDelete">Delete</div>
    </div>
</template>
