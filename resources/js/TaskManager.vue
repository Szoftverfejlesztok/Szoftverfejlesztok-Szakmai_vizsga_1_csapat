<script setup>
import { computed } from "vue";
import gravatar from "gravatar";

import { useUserStore } from "./stores/user";
import AddTask from "./AddTask.vue";
import TaskList from "./TaskList.vue";

const { user, logout } = useUserStore();

const avatar = computed(() => gravatar.url(user.email));
</script>
<template>
    <div class="container p-5">
        <div class="box">
            <div class="flex justify-between items-center mb-5">
                <div class="flex justify-between">
                    <img
                        :src="avatar"
                        :alt="user.name"
                        class="rounded-full w-10 h-10 mr-2"
                    />
                    <div class="h-10 flex items-center">
                        Hello {{ user.name }}!
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        class="btn-secondary btn-xs"
                        @click="logout"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <AddTask />
            <TaskList />
        </div>
    </div>
</template>
