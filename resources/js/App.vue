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
        v-if="userStore.initialized && !userStore.loading"
        class="min-h-screen bg-person-stands-hallway bg-center bg-cover py-10 flex"
    >
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
