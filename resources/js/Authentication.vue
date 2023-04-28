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
    <div
        style="
                    font-family: 'Courier New';
                    font-size: 2vw;
                    color: yellowgreen;
                    font-weight: bold;
                    text-shadow: 2px 4px 4px black;
                "
        v-if="store.loading">Getting the current user...</div>
    <div v-else>
        <div v-if="store.user">
            Hello {{ store.user.name }}
            <button
                type="submit"
                class="bg-fuchsia-400 text-white rounded-md px-2 bg-gradient-to-r from-blue-500"
                style="text-shadow: 2px 4px 4px purple; font-size: 1vw"
                @click="store.logout">Logout</button>
            <slot></slot>
        </div>
        <Login v-else />
    </div>
</template>
