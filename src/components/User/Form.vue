<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>U</b>sers</h2>
                <h3>{{ subtitle }}</h3>
            </div>

            <a @click="$router.push({name: 'users'})" class="cursor-pointer">
                Back
            </a>

            <div class="col-5 gc-content mt-3">
                <form @submit="submit" autocomplete="off">
                    <div class="form-group row mb-3">
                        <label class="col-sm-2 col-form-label">
                            Name
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="user.name" autocomplete="off"
                                   placeholder="Name" :required="!this.user.id" :disabled="this.user.id">
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label class="col-sm-2 col-form-label">
                            Email
                        </label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" v-model="user.email" autocomplete="off"
                                   placeholder="Email" :required="!this.user.id" :disabled="this.user.id">
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label class="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" v-model="user.password" autocomplete="off"
                                   placeholder="Password" :required="!this.user.id">
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label class="col-sm-2 col-form-label">
                            Roles
                        </label>
                        <div class="col-sm-10">
                            <multiselect :multiple="true"
                                         :searchable="true"
                                         v-model="user.roles"
                                         placeholder="Select a role"
                                         required
                                         :options="roles"></multiselect>
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <div class="offset-10 col-sm-2">
                            <button class="btn btn-sm btn-primary float-end" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import RoleService from "../../services/RoleService";
import UserService from "../../services/UserService";

export default {
    name: 'FormUsers',
    components: {Multiselect},
    props: {
        subtitle: {
            type: String,
            default: ''
        },
        user: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    name: null,
                    email: null,
                    password: null,
                    roles: [],
                }
            }
        }
    },
    data() {
        return {
            roles: []
        };
    },
    mounted() {
        this.getRoles();
    },
    methods: {
        async getRoles() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await RoleService.get();

            if (data.length) {
                this.roles = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        async submit(e) {
            e.preventDefault();
            this.$root.$emit('gcLoading', 1);

            const validation = this.validate();

            if (!validation) {
                this.$root.$emit('gcLoading', 0);
                return;
            }

            if (this.user.id !== null) {
                await this.updateUser();
                return;
            }

            await this.createUser();

        },
        validate() {
            if (!this.user.name) {
                this.$toast.error('Name is required.');
                return false;
            }

            if (!this.user.email) {
                this.$toast.error('Email is required.');
                return false;
            }

            if (!this.user.password && !this.user.id) {
                this.$toast.error('Password is required.');
                return false;
            }

            if (this.user.roles.length < 1) {
                this.$toast.error('Rules is required.');
                return false;
            }

            return true;
        },
        async createUser() {
            try {
                await UserService.create(this.user);

                this.$root.$emit('gcLoading', 0);
                this.$toast.success('User created successfully.');
                await this.$router.push({name: 'users'});
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
                this.$root.$emit('gcLoading', 0);
            }
        },
        async updateUser() {
            try {
                await UserService.update(this.user);

                this.$root.$emit('gcLoading', 0);
                this.$toast.success('User updated successfully.');
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
                this.$root.$emit('gcLoading', 0);
            }
        }
    },
}
</script>
<style scoped>
.gc-content {
    border: solid 1px #ddd;
    padding: 1em;
}
</style>
