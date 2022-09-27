<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <div class="d-flex justify-content-between">
                <div>
                    <h2><b>C</b>omment</h2>
                    <h3>Manage post id {{ item.id }}</h3>
                    <a class="mt-2 cursor-pointer" @click="$router.push({name: 'moderators-comments'})">Back</a>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary me-2" @click="openRestore">
                        <b-icon-recycle></b-icon-recycle>
                        Restore
                    </button>
                    <button class="btn btn-sm btn-danger" @click="openDelete">
                        <b-icon-trash2-fill></b-icon-trash2-fill>
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <div class="row mt-3 mb-3" v-if="item.id">
            <div class="col-3">
                <h3>Informant</h3>
                <div class="mt-2">
                    <a :href="`${basePath}/@${reporter}`" target="_blank">{{ `@${reporter}` }}</a>
                </div>
                <div class="mt-2">
                    <label class="form-label">Report date</label>
                    <input type="text" class="form-control" disabled v-model="reportedAt">
                </div>
            </div>
            <div class="col-3">
                <h3>User Reported</h3>
                <div class="mt-2">
                    <a :href="`${basePath}/@${item.author.username}`" target="_blank">{{ `@${item.author.username}` }}</a>
                </div>
            </div>
            <div class="col-3">
                <h3>Info</h3>
                <div class="mt-2">
                    <label class="form-label">Reason</label>
                    <input type="text" class="form-control" disabled v-model="reason">
                </div>

                <div class="mt-2">
                    <label class="form-label">Comment date</label>
                    <input type="text" class="form-control" disabled v-model="item.createdAt">
                </div>

                <div class="mt-2" v-show="abused">
                    <label class="form-label">Abused Username</label>
                    <a class="ms-1 text-decoration-none" target="_blank" :href="`${basePath}/@${abused}`">
                        {{ `@${abused}` }}
                    </a>
                    <br>
                    <input type="text" class="form-control" disabled v-model="abused">
                </div>
                <div class="mt-2">
                    <label class="form-label">Comment</label>
                    <a class="ms-2" :href="`${basePath}/@${item.author.username}/p/${item.post.id}/c/${item.id}`" target="_blank">click here to see comment</a><br>
                    <input type="text" class="form-control" disabled v-model="item.content">
                </div>
            </div>
        </div>

        <modal :title="`Restore comment`"
                      @confirm="restoreItem"
                      @close="closeRestore">
            <template v-slot:content>
                <p>Are you sure you want to restore <b class='text-primary'>comment</b> ?</p>
                <div class="form-group text-start">
                    <label>Reason</label>
                    <textarea class="form-control" v-model="action.reason"></textarea>
                </div>
            </template>
        </modal>

        <modal-delete :title="`Delete comment`"
                      @confirm="deleteItem"
                      @close="closeDelete">
            <template v-slot:content>
                <p>Are you sure you want to delete <b class='text-danger'>comment</b> ?</p>
                <div class="form-group text-start">
                    <label>Reason</label>
                    <textarea class="form-control" v-model="action.reason"></textarea>
                </div>
            </template>
        </modal-delete>
    </div>
</template>
<script>
import CommentService from "../../../services/Moderator/CommentService";
import ModalDelete from "../../../components/Shared/Modal/Delete";
import Modal from "../../../components/Shared/Modal/Modal";

export default {
    name: 'ReportedCommentEdit',
    components: {ModalDelete, Modal},
    data() {
        return {
            id: null,
            item: {},
            action: {
                reason: null
            },
        }
    },
    mounted() {
        this.id = this.$route.params.id;

        if (!this.id) {
            this.$router.push({name: 'moderators-comments'});
        }

        this.setItem();
    },
    computed: {
        basePath() {
            return process.env.VUE_APP_GOT_CHOSEN_URL;
        },
        reporter() {
            return this.item.report[0].reporter.username;
        },
        reason() {
            return this.item.report[0].reason;
        },
        reportedAt() {
            return this.item.report[0].reportedAt;
        },
        abused() {
            return this.item.report[0].abused.username;
        }
    },
    methods: {
        async setItem() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await CommentService.find(this.id)

            if (data.id) {
                this.item = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        openRestore() {
            this.$root.$emit('modal', true);
        },
        openDelete() {
            this.$root.$emit('modalDelete', true);
        },
        closeDelete() {
            this.$root.$emit('modalDelete', false);
        },
        closeRestore() {
            this.$root.$emit('modal', false);
        },
        async deleteItem() {
            this.$root.$emit('gcLoading', 1);

            if (!this.validateReason()) {
                this.$root.$emit('gcLoading', 0);
                return;
            }

            try {
                await CommentService.delete({
                    id: this.item.id,
                    reason: this.action.reason
                });

                this.$toast.success('Comment removed successfully');

                this.$root.$emit('gcLoading', 0);

                this.closeDelete();

                await this.$router.push({name: 'moderators-comments'});
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async restoreItem() {
            this.$root.$emit('gcLoading', 1);

            if (!this.validateReason()) {
                this.$root.$emit('gcLoading', 0);
                return;
            }

            try {
                await CommentService.restore({
                    id: this.item.id,
                    reason: this.action.reason
                });

                this.$toast.success('Comment restored successfully');

                this.$root.$emit('gcLoading', 0);

                this.closeRestore();

                await this.$router.push({name: 'moderators-comments'});

                this.closeRestore();
            } catch (e) {
                this.$toast.error(e.response.data.message || e.message);
            }

            this.$root.$emit('gcLoading', 0);
        },

        validateReason() {
            if (!this.action.reason) {
                this.$toast.error('Reason is required');
                return false;
            }

            return true;
        }
    }
}
</script>
<style scoped>
</style>
