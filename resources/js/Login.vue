<script setup>
import { reactive } from "vue";
import { useUserStore } from "./stores/user";

const store = useUserStore();

const state = reactive({ email: "", password: "", failed: false });

async function login($event) {
    $event.preventDefault();
    state.failed = false;

    try {
        const { email, password } = state;
        await store.login(email, password);
    } catch (e) {
        state.failed = true;
    }
}
</script>

<template>
    <form @submit="login">
        <div>
            <label>Email</label>
            <input type="email" v-model="state.email" />
        </div>
        <div>
            <label>Password</label>
            <input type="password" v-model="state.password" />
        </div>
        <button type="submit">Login</button>
        <div v-if="state.failed">Failed to log in</div>
    </form>
</template>

<style scoped></style>
