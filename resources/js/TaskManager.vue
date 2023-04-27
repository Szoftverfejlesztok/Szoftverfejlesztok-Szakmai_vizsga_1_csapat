<script setup>
import { useUserStore } from "./stores/user";
import AddTask from "./AddTask.vue";
import TaskList from "./TaskList.vue";

const { user, logout } = useUserStore();
</script>
<template>
    <div v-if="user">
        Hello {{ user.name }}
        <button @click="logout">Logout</button>
    </div>
    <AddTask />
    <TaskList />
</template>
