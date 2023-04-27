<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import Login from "./Login.vue";

const store = useUserStore();

onMounted(() => {
    store.checkUser();
});
</script>

<template>
    <div v-if="store.loading">Getting the current user...</div>
    <div v-else>
        <div v-if="store.user">
            Hello {{ store.user.name }}
            <button @click="store.logout">Logout</button>
            <slot></slot>
        </div>
        <Login v-else />
    </div>
</template>
