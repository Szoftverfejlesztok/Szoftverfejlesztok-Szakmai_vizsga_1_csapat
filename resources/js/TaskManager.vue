<script setup>
import { useUserStore } from "./stores/user";
import AddTask from "./AddTask.vue";
import TaskList from "./TaskList.vue";

const { user, logout } = useUserStore();
</script>
<template>
    <div
        style="
                    font-family: 'Courier New';
                    font-size: 1.5vw;
                    color: crimson;
                    font-weight: bold;
                    text-shadow: 2px 4px 4px black;
                "
        v-if="user">
        Hello {{ user.name }}
        <button
            type="submit"
            class="bg-fuchsia-400 text-white rounded-md px-2 bg-gradient-to-r from-blue-500"
            style="text-shadow: 2px 4px 4px purple; font-size: 1vw"
            @click="logout">Logout</button>
    </div>
    <AddTask />
    <TaskList />
</template>
