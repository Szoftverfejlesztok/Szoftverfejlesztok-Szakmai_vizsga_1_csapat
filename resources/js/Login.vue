<script setup>
import { reactive } from "vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

let state = reactive({
    email: "",
    password: "",
    failed: false,
});

async function onSubmit($event) {
    $event.preventDefault();
    state.failed = false;

    try {
        await userStore.login(state.email, state.password);
    } catch (e) {
        console.error(e);
        state.failed = true;
    }
}
</script>

<template>
    <form @submit="onSubmit" novalidate>
        <div
            style="
                font-family: 'Verdana';
                font-size: 2vw;
                color: lightsalmon;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
            class="grid grid-cols-1 gap-4"
        >
            <label class="px-5" for="email">Email</label>
            <input id="email" type="email" v-model="state.email" />
            <label class="px-5" for="password">Password</label>
            <input id="password" type="password" v-model="state.password" />
        </div>
        <button class="btn-primary" type="submit">Login</button>

        <button class="btn-primary float-right" type="submit">
            <router-link to="/register">Register</router-link>
        </button>
        <div
            style="
                font-family: 'Courier New';
                font-size: 3vw;
                color: crimson;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
            v-if="state.failed"
        >
            Failed to log in
        </div>
    </form>
</template>
