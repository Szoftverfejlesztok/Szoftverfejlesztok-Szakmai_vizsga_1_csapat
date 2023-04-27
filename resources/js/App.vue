<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import Authentication from "./Authentication.vue";
import AddTask from "./AddTask.vue";
import TaskList from "./TaskList.vue";

const store = useUserStore();

onMounted(() => {
    store.initialize();
});
</script>

<template>
    <div class="h-screen bg-person-stands-hallway bg-center bg-cover">
        <div class="container">
            <h1
                style="
                    font-family: 'Courier New';
                    font-size: 3vw;
                    color: goldenrod;
                    font-weight: bold;
                    text-shadow: 2px 4px 4px black;
                "
            >
                To Do App
            </h1>
            <div v-if="store.initialized">
                <Authentication>
                    <AddTask />
                    <TaskList />
                </Authentication>
            </div>
            <div
                style="
                    font-family: 'Courier New';
                    font-size: 3vw;
                    color: yellowgreen;
                    font-weight: bold;
                    text-shadow: 2px 4px 4px black;
                "
                v-else
            >
                Loading...
            </div>
        </div>
    </div>
</template>
