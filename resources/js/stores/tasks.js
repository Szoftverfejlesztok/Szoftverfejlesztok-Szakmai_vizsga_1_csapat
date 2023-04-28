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
        async getTasks() {
            try {
                const { data } = await tasks.get("/");
                this.tasks = data;
            } catch (e) {
                console.error(e);
            }
        },
        async addTask(task) {
            try {
                await tasks.post("/", task);
                this.getTasks();
            } catch (e) {
                console.error(e);
            }
        },
        async doneTask(id) {
            await this.updateTask({ id, done: true });
        },
        async undoneTask(id) {
            await this.updateTask({ id, done: false });
        },
        async updateTask(task) {
            try {
                await tasks.put(`/${task.id}`, task);
                this.getTasks();
            } catch (e) {
                console.error(e);
            }
        },
        async deleteTask(id) {
            try {
                await tasks.delete(`/${id}`);
                this.getTasks();
            } catch (e) {
                console.error(e);
            }
        },
    },
});
