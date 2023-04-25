<script>
import { FRAGMENT } from '@vue/compiler-core';
import Login from './Login.vue'

export default {
    data() {
        return {
            loading: true,
            user: null,
        }
    },
    methods: {
        async checkUser() {
            try {
                const { data } = await axios.get('/api/user')
                this.loading = false;
                this.user = data;
            } catch (e) {
                this.loading = false;
                this.user = null;
            }
        },
        async logout() {
            try {
                await axios.post('/logout');
            } catch (e) {
                console.error(e);
            }
            this.checkUser();
        }
    },
    mounted() {
        this.checkUser();
    },
    components: { Login }
}
</script>

<template>
    <div v-if="loading">
        Getting the current user...
    </div>
    <div v-else>
        <div v-if="user">
            Hello {{ user.name }}
            <button @click="logout">Logout</button>
            <slot></slot>
        </div>
        <Login v-else @loggedIn="checkUser" />
    </div>
</template>

<style scoped></style>