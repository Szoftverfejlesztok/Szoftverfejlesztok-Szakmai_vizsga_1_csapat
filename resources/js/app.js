import "./bootstrap";
import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory, useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import App from "./App.vue";
import TaskManager from "./TaskManager.vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

const routes = [
    {
        path: "/",
        component: TaskManager,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        component: Login,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/register",
        component: Register,
        meta: {
            requiresGuest: true,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const userStore = useUserStore();

function getRedirectPath(route, isAuthenticated) {
    if (!isAuthenticated && route.meta.requiresAuth) {
        return "/login";
    }

    if (isAuthenticated && route.meta.requiresGuest) {
        return "/";
    }
}

watch(userStore, () => {
    const redirectPath = getRedirectPath(
        router.currentRoute.value,
        userStore.isAuthenticated
    );

    if (redirectPath) {
        router.push(redirectPath);
    }
});

router.beforeEach(async (to) => {
    const redirectPath = getRedirectPath(to, userStore.isAuthenticated);

    if (redirectPath) {
        return { path: redirectPath };
    }
});

app.use(router).mount("#app");
