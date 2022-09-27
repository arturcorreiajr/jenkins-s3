<template>
    <div>
        <loading :loading="loading"></loading>
        <router-view v-if="!token"></router-view>
        <panel v-else>
            <router-view></router-view>
        </panel>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService';
import Panel from '@/components/Panel';
import Loading from '@/components/Shared/Loading';

export default {
    name: "App",
    components: {Panel, Loading},
    data() {
        return {
            token: null,
            loading: 0
        };
    },
    created() {
        this.token = AuthService.getToken();

        this.$root.$on('gcLoading', val => {
            this.loading = val;
        });
    },
};
</script>
<style scoped>
</style>
