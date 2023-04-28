<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

onMounted(() => {
    userStore.initialize();
});
</script>

<template>
    <div class="min-h-screen bg-person-stands-hallway bg-center bg-cover">
        <div class="container">
            <h1
                style="
                    font-family: 'Courier New';
                    font-size: 2vw;
                    color: goldenrod;
                    font-weight: bold;
                    text-shadow: 2px 4px 4px black;
                "
            >
                To Do App
            </h1>
            <div v-if="userStore.initialized">
                <router-view></router-view>
            </div>
            <div
                style="
                    font-family: 'Courier New';
                    font-size: 2vw;
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
