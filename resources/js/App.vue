<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

onMounted(() => {
    userStore.initialize();
});
</script>

<template>
    <div
        class="min-h-screen bg-person-stands-hallway bg-center bg-cover py-10 flex"
    >
        <router-view v-if="userStore.initialized"></router-view>
    </div>
</template>
