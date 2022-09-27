<template>
    <div>
        <div class="input-group mt-3">
            <input type="text" class="form-control" placeholder="Username" v-model="username" @keyup.enter="search">
            <button @click="search" class="input-group-text btn btn-primary btn-sm">
                <b-icon-search class="me-2"></b-icon-search>
                Search
            </button>
        </div>
    </div>
</template>
<script>
import ModeratorUserService from "../../../services/Moderator/UserService";

export default {
    name: 'FindApiUser',
    data() {
        return {
            username: null
        }
    },
    mounted() {
        if (this.username) {
            this.search();
        }
    },
    methods: {
        async search() {
            this.$root.$emit('gcLoading', 1);

            if (!this.username) {
                this.$toast.error('Username is required');
                this.$root.$emit('gcLoading', 0);
                return;
            }

            try {
                const {data} = await ModeratorUserService.find(this.username);
                this.$emit('user', data);
            } catch (e) {
                this.$emit('user', {});
                this.$toast.error(e.response.data.message || e.message || 'User not found.');
            } finally {
                this.$root.$emit('gcLoading', 0);
            }
        }
    }
}
</script>
<style scoped>
</style>
