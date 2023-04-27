<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import Authentication from "./Authentication.vue";
import TaskList from "./TaskList.vue";

const store = useUserStore();

onMounted(() => {
    store.initialize();
});
</script>

<template>
    <h1>To Do App</h1>
    <div v-if="store.initialized">
        <Authentication>
            <TaskList />
        </Authentication>
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped></style>
