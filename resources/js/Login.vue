<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            failed: false,
        }
    },
    methods: {
        async login($event) {
            $event.preventDefault();
            this.failed = false;

            try {
                const { email, password } = this;
                await axios.post('/login', { email, password })
                this.$emit('loggedIn')
            } catch (e) {
                this.failed = true;
            }
        }
    }
}
</script>

<template>
    <form @submit="login">
        <div>
            <label>Email</label>
            <input type="email" v-model="email">
        </div>
        <div>
            <label>Password</label>
            <input type="password" v-model="password">
        </div>
        <button type="submit">Login</button>
        <div v-if="failed">
            Failed to log in
        </div>
    </form>
</template>

<style scoped></style>