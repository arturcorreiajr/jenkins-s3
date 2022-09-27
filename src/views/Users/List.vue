<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>U</b>sers</h2>
                <h3>All users in backoffice</h3>
            </div>

            <a @click="$router.push({name: 'create-user'})" class="btn btn-sm btn-success" v-b-tooltip.hover
               title="Create user">
                Create
            </a>

            <gc-table
                class="mt-3"
                :items="items"
                :fields="fields"
                :limit="10"
            >
                <template v-slot:actions="data">
                    <a class="btn btn-sm btn-primary me-2" v-b-tooltip.hover title="Edit user"
                       @click="$router.push({name: 'edit-user', params: { id: data.row.id }})">
                        <b-icon-pencil-square></b-icon-pencil-square>
                    </a>
                    <a class="btn btn-sm btn-danger" v-b-tooltip.hover title="Delete user"
                       @click="openDelete(data.row)">
                        <b-icon-trash></b-icon-trash>
                    </a>
                </template>
            </gc-table>

            <modal-delete :title="`Delete user`"
                          @confirm="deleteUser"
                          @close="closeDelete">
                <template v-slot:content>
                    <p>Are you sure you want to delete the user <span class='text-danger'>{{ user.name }}</span> ?</p>
                </template>
            </modal-delete>
        </div>
    </div>
</template>
<script>
import GcTable from "../../components/Shared/GcTable";
import UserService from "../../services/UserService";
import ModalDelete from "../../components/Shared/Modal/Delete";

export default {
    name: 'Users',
    components: {ModalDelete, GcTable},
    data() {
        return {
            name: null,
            items: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'name', label: 'Name', sortable: true},
                {key: 'email', label: 'Email', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            limit: 10,
            user: {}
        };
    },
    mounted() {
        this.getItems();
    },
    methods: {
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await UserService.get();

            if (data.length) {
                this.items = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        openDelete(user) {
            this.$root.$emit('modalDelete', true);
            this.user = user;
        },
        closeDelete() {
            this.user = {};
            this.$root.$emit('modalDelete', false);
        },
        async deleteUser() {
            this.$root.$emit('gcLoading', 1);

            try {
                await UserService.delete(this.user);
                this.$toast.success('User deleted successfully');
                this.closeDelete();
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);

            await this.getItems();
        }
    },
}
</script>
<style scoped>
</style>
