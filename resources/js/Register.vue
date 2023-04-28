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
    <div class="container p-5 flex items-center">
        <div class="box pt-10">
            <form @submit="onSubmit" novalidate>
                <div class="flex flex-col">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="state.name" />
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model="state.email" />
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        v-model="state.password"
                    />
                    <label for="password-confirmation"
                        >Password confirmation</label
                    >
                    <input
                        id="password-confirmation"
                        type="password"
                        v-model="state.passwordConfirmation"
                    />
                </div>
                <div class="flex flex-col">
                    <button class="btn-primary mb-5" type="submit">
                        Register
                    </button>
                    <router-link
                        class="btn-secondary mb-5"
                        type="submit"
                        to="/login"
                        >Login</router-link
                    >
                    <div
                        class="transition-all text-red-500 text-center"
                        :class="
                            state.failed
                                ? ['']
                                : ['opacity-0', 'scale-50', 'invisible']
                        "
                    >
                        Failed to register
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
