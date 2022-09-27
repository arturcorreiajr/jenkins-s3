<template>
    <form-user :subtitle="`Create user in backoffice`" :user="user"></form-user>
</template>
<script>
import FormUser from "../../components/User/Form";

export default {
    name: 'CreateUsers',
    components: {FormUser},
    data() {
        return {
            user: {
                id: null,
                name: null,
                email: null,
                password: null,
                roles: [],
            }
        }
    }
}
</script>
<style scoped>
</style>
