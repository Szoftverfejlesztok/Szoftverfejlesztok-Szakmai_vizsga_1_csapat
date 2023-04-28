import axios from "axios";
import { defineStore } from "pinia";

const tasks = axios.create({
    baseURL: "/api/tasks",
});

function compareByDeadline(a, b) {
    if (a.deadline === null) {
        return 1;
    }

    if (b.deadline === null) {
        return -1;
    }

    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
}

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: null,
    }),
    getters: {
        unfinishedTasks() {
            return this.tasks
                ?.filter((task) => !task.done)
                ?.sort(compareByDeadline);
        },
        finishedTasks() {
            return this.tasks
                ?.filter((task) => task.done)
                ?.sort(compareByDeadline);
        },
    },
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
