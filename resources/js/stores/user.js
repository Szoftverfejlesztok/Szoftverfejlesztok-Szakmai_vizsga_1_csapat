import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        initialized: false,
        loading: true,
        user: null,
    }),
    getters: {
        isAuthenticated() {
            return this.user !== null;
        },
    },
    actions: {
        async initialize() {
            if (this.initialized) {
                return;
            }
            try {
                await axios.get("/sanctum/csrf-cookie");
                this.initialized = true;
                await this.checkUser();
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
            await this.checkUser();
        },
        async login(email, password) {
            await axios.post("/login", { email, password });
            await this.checkUser();
        },
        async register(name, email, password, password_confirmation) {
            await axios.post("/register", {
                name,
                email,
                password,
                password_confirmation,
            });
            await this.checkUser();
        },
    },
});
