<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b>U</b>sers</h2>
            <h3>Manage users (moderators)</h3>
        </div>

        <div class="row">
            <div class="col-3">
                <find-api-user @user="getUser"></find-api-user>
                <form-api-user :user="user" v-if="user.id"></form-api-user>
            </div>

            <div class="col-9 d-flex mt-3" v-if="user.id">
                <div class="me-2">
                    <button class="btn btn-warning btn-sm" @click="openSuspend">
                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                        Suspend
                    </button>
                </div>

                <button class="btn btn-danger btn-sm me-2" @click="openBan">
                    <b-icon-x-circle-fill></b-icon-x-circle-fill>
                    Ban
                </button>

                <button class="btn btn-secondary btn-sm me-2" @click="openDel">
                    <b-icon-trash2-fill></b-icon-trash2-fill>
                    Delete
                </button>

                <button class="btn btn-info btn-sm" @click="openVerify">
                    <b-icon-check-circle-fill></b-icon-check-circle-fill>
                    Verify
                </button>
            </div>
        </div>

        <modal-suspend :title="`Suspend user`" @suspend="suspend">
            <template v-slot:content>
                <p>Are you sure you want to <b class="text-danger">SUSPEND</b> the user <b
                    class='text-danger'>{{ user.username }}</b> ?</p>
            </template>
        </modal-suspend>

        <modal-ban :title="`Ban user`" @ban="ban">
            <template v-slot:content>
                <p>Are you sure you want to <b class="text-danger">BAN</b> the user <b
                    class='text-danger'>{{ user.username }}</b> ?</p>
            </template>
        </modal-ban>

        <modal-del :title="`Delete user`" @del="del">
            <template v-slot:content>
                <p>Are you sure you want to <b class="text-danger">DELETE</b> the user <b
                    class="text-danger">{{ user.username }}</b> ?</p>
            </template>
        </modal-del>

        <modal-verify @verify="verify">
            <template v-slot:content>
                <p>Are you sure you want to <b class="text-info">VERIFY</b> the user <b
                    class="text-info">{{ user.username }}</b> ?</p>
            </template>
        </modal-verify>
    </div>
</template>
<script>
import FindApiUser from "../../../components/Moderator/User/Find";
import FormApiUser from "../../../components/Moderator/User/Form";
import ModalSuspend from "../../../components/Moderator/User/Modal/Suspend";
import ModalBan from "../../../components/Moderator/User/Modal/Ban";
import ModeratorUserService from "../../../services/Moderator/UserService";
import ModalDel from "../../../components/Moderator/User/Modal/Del";
import ModalVerify from "../../../components/Moderator/User/Modal/Verify";

export default {
    name: 'ModeratorsUsers',
    components: {ModalVerify, ModalDel, ModalSuspend, ModalBan, FormApiUser, FindApiUser},
    data() {
        return {
            user: {}
        }
    },
    mounted() {
    },
    methods: {
        getUser(user) {
            this.user = user;
        },
        openSuspend() {
            this.$root.$emit('modalSuspend', true);
        },
        openBan() {
            this.$root.$emit('modalBan', true);
        },
        openDel() {
            this.$root.$emit('modalDel', true);
        },
        openVerify() {
            this.$root.$emit('modalVerify', true);
        },
        async suspend(event) {
            if (!this.validateAction(event, true)) {
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    username: this.user.username,
                    reason: event.reason,
                    days: event.days,
                }

                await ModeratorUserService.suspend(params);

                this.$toast.success('User suspended successfully');
                this.user = {};
                this.$root.$emit('modalSuspend', false);
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async ban(event) {
            if (!this.validateAction(event, false)) {
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    username: this.user.username,
                    reason: event.reason,
                }

                await ModeratorUserService.ban(params);

                this.$toast.success('User banned successfully');
                this.user = {};
                this.$root.$emit('modalBan', false);
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async del(event) {
            if (!this.validateAction(event, false)) {
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    username: this.user.username,
                    reason: event.reason,
                }

                await ModeratorUserService.del(params);

                this.$toast.success('User deleted successfully');
                this.user = {};
                this.$root.$emit('modalDel', false);
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async verify(event) {
            if (!this.validateAction(event) || !this.validateAttachment(event)) {
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const formData = new FormData();
                formData.append('username', this.user.username);
                formData.append('reason', event.reason);
                formData.append('attachment', event.attachment);

                await ModeratorUserService.verify(formData);

                this.$toast.success('User verified successfully');
                this.user = {};
                this.$root.$emit('modalVerify', false);
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);
        },
        validateAction(data, validateDays = false) {
            if (!this.user.id) {
                return false;
            }

            if (validateDays && !data.days) {
                this.$toast.error('Days is required.');
                return false;
            }

            if (!data.reason) {
                this.$toast.error('Reason is required.');
                return false;
            }

            return true;
        },
        validateAttachment(data) {
            if (!data.attachment) {
                this.$toast.error('Attachment is required.');
                return false;
            }

            return true;
        }
    }
}
</script>
<style scoped>
</style>
