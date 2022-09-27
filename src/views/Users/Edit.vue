<template>
    <form-user :subtitle="`Edit user in backoffice`" :user="user"></form-user>
</template>
<script>
import FormUser from "../../components/User/Form";
import UserService from "../../services/UserService";

export default {
    name: 'EditUsers',
    components: {FormUser},
    data() {
        return {
            id: null,
            user: {
                id: null,
                name: null,
                email: null,
                password: null,
                roles: [],
            }
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getUser();
    },
    methods: {
        async getUser() {
            const { data } = await UserService.get(this.id);
            this.user = {
                id: data[0].id,
                name: data[0].name,
                email: data[0].email,
                password: null,
                roles: data[0].roles,
            };
        }
    }
}
</script>
<style scoped>
</style>
