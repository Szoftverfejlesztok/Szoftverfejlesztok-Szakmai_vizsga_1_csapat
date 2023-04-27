import axios from "axios";
import { defineStore } from "pinia";

const tasks = axios.create({
    baseURL: "/api/tasks",
});

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: null,
    }),
    getters: {},
    actions: {
        async updateTasks() {
            try {
                const { data } = await tasks.get("/");
                this.tasks = data;
            } catch (e) {
                console.error(e);
            }
        },
    },
});
