<script>
export default {
    data() {
        return {
            tasks: null,
        };
    },
    async mounted() {
        try {
            const { data } = await axios.get("/api/tasks");
            this.tasks = data;
        } catch (e) {
            console.error(e);
        }
    },
};
</script>

<template>
    <h2>Task List</h2>
    <div v-for="task in tasks">
        <div>{{ task.name }}</div>
    </div>
</template>

<style scoped></style>
