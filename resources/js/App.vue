<script>

import Authentication from './Authentication.vue'

export default {
    data() {
        return {
            initialized: false,
        };
    },
    mounted() {
        axios.get("/sanctum/csrf-cookie").then(() => {
            this.initialized = true;
        });
    },
    components: { Authentication }
}
</script>

<template>
    <h1>To Do App</h1>
    <div v-if="initialized">
        <Authentication>
            <div>Authenticated, showing TODOs</div>
        </Authentication>
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped></style>