import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        initialized: false,
        loading: true,
        user: null,
    }),
    getters: {},
    actions: {
        async initialize() {
            if (this.initialized) {
                return;
            }
            try {
                await axios.get("/sanctum/csrf-cookie");
                this.initialized = true;
            } catch (e) {
                console.error(e);
            }
        },
        async checkUser() {
            try {
                const { data } = await axios.get("/api/user");
                this.loading = false;
                this.user = data;
            } catch (e) {
                this.loading = false;
                this.user = null;
            }
        },
        async logout() {
            try {
                await axios.post("/logout");
            } catch (e) {
                console.error(e);
            }
            this.checkUser();
        },
        async login(email, password) {
            await axios.post("/login", { email, password });
            this.checkUser();
        },
    },
});
