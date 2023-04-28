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
        <label
            style="
                    font-family: 'Courier New';
                    font-size: 1vw;
                    color: limegreen;
                    font-weight: bolder;
                    text-shadow: 1px 2px 2px black;
                "
        >
            <input
                type="checkbox"
                :id="props.task.id"
                :checked="props.task.done"
                @input="onCheck"
            />
            {{ props.task.name }}
        </label>
        <div
            type="submit"
            class="text-white rounded-md px-2 bg-gradient-to-r from-red-800"
            style="text-shadow: 2px 4px 4px purple; font-size: 1vw"
            role="button" @click="onDelete">Delete</div>
    </div>
</template>
