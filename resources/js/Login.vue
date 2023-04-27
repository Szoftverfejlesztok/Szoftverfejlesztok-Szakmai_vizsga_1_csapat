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
        <div style="
                font-family: 'Courier New';
                font-size: 4vw;
                color: lightsalmon;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            " class="grid grid-cols-1 gap-4">
            <label class="px-5">Email</label>
            <input type="email" v-model="state.email" class="px-5 mb-5 rounded-full" />
            <label class="px-5">Password</label>
            <input type="password" v-model="state.password" class="px-5 mb-5 rounded-full" />
        </div>
        <button class="rounded-full bg-fuchsia-800 px-10" style="
                font-family: 'Courier New';
                font-size: 4vw;
                color: mediumspringgreen;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            " type="submit">
            Login
        </button>
        <div v-if="state.failed">Failed to log in</div>
    </form>
</template>
