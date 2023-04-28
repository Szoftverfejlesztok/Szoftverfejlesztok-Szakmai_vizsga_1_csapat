<script setup>
import { reactive } from "vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

let state = reactive({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    failed: false,
});

async function onSubmit($event) {
    $event.preventDefault();
    state.failed = false;

    try {
        await userStore.register(
            state.name,
            state.email,
            state.password,
            state.passwordConfirmation
        );
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
                font-family: 'Courier New';
                font-size: 2vw;
                color: lightsalmon;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
            class="grid grid-cols-1 gap-4"
        >
            <label class="px-5" for="name">Name</label>
            <input
                id="name"
                type="text"
                v-model="state.name"
                class="px-5 mb-5 rounded-full"
            />
            <label class="px-5" for="email">Email</label>
            <input
                id="email"
                type="email"
                v-model="state.email"
                class="px-5 mb-5 rounded-full"
            />
            <label class="px-5" for="password">Password</label>
            <input
                id="password"
                type="password"
                v-model="state.password"
                class="px-5 mb-5 rounded-full"
            />
            <label class="px-5" for="password-confirmation"
                >Password confirmation</label
            >
            <input
                id="password-confirmation"
                type="password"
                v-model="state.passwordConfirmation"
                class="px-5 mb-5 rounded-full"
            />
        </div>
        <button
            class="rounded-full bg-fuchsia-800 px-10 float-left"
            style="
                font-family: 'Courier New';
                font-size: 2vw;
                color: mediumspringgreen;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
            type="submit"
        >
            Register
        </button>
        <router-link
            class="rounded-full bg-fuchsia-800 px-10 float-right"
                style="
                font-family: 'Courier New';
                font-size: 2vw;
                color: mediumspringgreen;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
                type="submit"
         to="/login">Login</router-link>
        <div
            style="
                font-family: 'Courier New';
                font-size: 3vw;
                color: crimson;
                font-weight: bold;
                text-shadow: 2px 4px 4px black;
            "
            v-if="state.failed">Failed to register</div>
    </form>
</template>
