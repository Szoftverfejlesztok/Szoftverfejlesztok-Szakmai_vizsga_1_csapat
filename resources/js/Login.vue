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
    <div class="container p-5 flex items-center">
        <div class="box pt-10">
            <form @submit="onSubmit" novalidate>
                <div class="flex flex-col mb-5">
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model="state.email" />
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        v-model="state.password"
                    />
                </div>
                <div class="flex flex-col">
                    <button class="btn-primary mb-5" type="submit">
                        Login
                    </button>

                    <router-link to="/register" class="btn-secondary mb-5"
                        >Register</router-link
                    >

                    <div
                        class="transition-all text-red-500 text-center"
                        :class="
                            state.failed
                                ? ['']
                                : ['opacity-0', 'scale-50', 'invisible']
                        "
                    >
                        Failed to log in
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
