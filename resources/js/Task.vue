<script setup>
import { computed } from "vue";
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

const deadline = computed(() => {
    if (!props.task.deadline) {
        return;
    }

    const date = new Date(props.task.deadline);
    const deadline = `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${(
        "0" + date.getUTCDate()
    ).slice(-2)}/${date.getUTCFullYear()}`;
    return deadline;
});
</script>

<template>
    <div
        data-testid="task"
        class="flex items-center justify-between bg-slate-300 py-3 px-3 mb-3 rounded"
    >
        <label class="m-0 px-0 flex items-center">
            <input
                type="checkbox"
                :id="props.task.id"
                :checked="props.task.done"
                @input="onCheck"
                class="mb-0 bg-white h-5 w-5 outline-2 outline-black border-red checked:bg-blue-500 focus:ring-blue-500 focus:ring-2"
            />
            <span class="pl-2">
                {{ props.task.name }}
            </span>
        </label>
        <div class="flex">
            <div
                v-if="deadline"
                class="mr-4 text-slate-600 inline-flex justify-center items-center text-sm"
            >
                {{ deadline }}
            </div>
            <div
                type="submit"
                class="btn-secondary btn-xs"
                role="button"
                @click="onDelete"
            >
                Delete
            </div>
        </div>
    </div>
</template>
