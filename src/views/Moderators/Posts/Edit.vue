<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <div class="d-flex justify-content-between">
                <div>
                    <h2><b>C</b>omment</h2>
                    <h3>Manage comment id {{ item.id }}</h3>
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

            <div class="row mt-3 mb-3" v-if="item.id">
                <div class="col-3">
                    <h3>Author</h3>
                    <div class="mt-2">
                        <label class="form-label">Username</label>
                        <input type="text" class="form-control" disabled v-model="item.author.username">
                    </div>
                </div>

                <div class="col-3">
                    <h3>Informant</h3>
                    <div class="mt-2">
                        <label class="form-label">Username</label>
                        <input type="text" class="form-control" disabled v-model="reporterUsername">
                    </div>
                </div>

                <div class="col-3">
                    <h3>Post</h3>
                    <a :href="postUrl" target="_blank">click here</a><br>
                    <div class="mt-2">
                        <label class="form-label">Reported at</label>
                        <input type="text" class="form-control" disabled v-model="reportedAt">
                    </div>
                    <div class="mt-2">
                        <label class="form-label">Reason</label>
                        <input type="text" class="form-control" disabled v-model="reason">
                    </div>
                </div>
            </div>

            <div class="row" v-if="media">
                <div class="col-3">
                    <video width="440" height="360" controls v-if="isVideo(media.mimeType)">
                        <source :src="media.original" :type="media.mimeType">
                        Your browser does not support the video tag.
                    </video>
                    <a :href="media.original" target="_blank" v-else>
                        <img style="width: 320px;" :src="media.original" alt="Media post - GotChosen"/>
                    </a>
                </div>
            </div>
        </div>

        <modal :title="`Restore post`"
                      @confirm="restoreItem"
                      @close="closeRestore">
            <template v-slot:content>
                <p>Are you sure you want to restore <b class='text-primary'>post</b> ?</p>
                <div class="form-group text-start">
                    <label>Reason</label>
                    <textarea class="form-control" v-model="action.reason"></textarea>
                </div>
            </template>
        </modal>

        <modal-delete :title="`Delete post`"
                      @confirm="deleteItem"
                      @close="closeDelete">
            <template v-slot:content>
                <p>Are you sure you want to delete <b class='text-danger'>post</b> ?</p>
                <div class="form-group text-start">
                    <label>Reason</label>
                    <textarea class="form-control" v-model="action.reason"></textarea>
                </div>
            </template>
        </modal-delete>
    </div>
</template>
<script>
import PostService from "../../../services/Moderator/PostService";
import ModalDelete from "../../../components/Shared/Modal/Delete";
import Modal from "../../../components/Shared/Modal/Modal";

export default {
    name: 'ReportedCommentsEdit',
    components: {ModalDelete, Modal},
    data() {
        return {
            id: null,
            item: {},
            media: null,
            action: {
                reason: null
            },
        }
    },
    mounted() {
        this.id = this.$route.params.id;

        if (!this.id) {
            this.$router.push({name: 'moderators-posts'});
        }

        this.setItem();
    },
    computed: {
        mediaPath() {
            return `${process.env.VUE_APP_CLOUD_FRONT_URL}/post/media`
        },
        postUrl() {
            return `${process.env.VUE_APP_GOT_CHOSEN_URL}/@${this.item.author.username}/p/${this.item.id}`;
        },
        reporterUsername() {
            return this.item.reporter.map((reporter) => {
                return ` ${reporter.username}`;
            });
        },
        reportedAt() {
            return this.item.reporter[0].reportedAt;
        },
        reason() {
            return this.item.reporter.map((reporter) => {
                return ` ${reporter.reason}`;
            });
        }
    },
    methods: {
        async setItem() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await PostService.find(this.id)

            if (data.id) {
                this.item = data;
                this.setMedia();
            }

            this.$root.$emit('gcLoading', 0);
        },
        setMedia() {
            const video = this.makeMedia(true);

            if (video) {
                this.media = video;
                return;
            }

            const media = this.makeMedia(false);

            if (media) {
                this.media = media;
            }
        },
        makeMedia(isVideo = true) {
            return this.item.media.find((media) => {
                const condition = isVideo ? this.isVideo(media.mimeType) : !this.isVideo(media.mimeType);
                if (condition) {
                    media.original = `${this.mediaPath}/${media.original}`;
                    return media;
                }
            });
        },
        isVideo(type) {
            const videoTypes = ['high_quality', 'video/mp4'];
            return videoTypes.includes(type);
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
                await PostService.delete({
                    id: this.item.id,
                    reason: this.action.reason
                });

                this.$toast.success('Post removed successfully');

                this.$root.$emit('gcLoading', 0);

                this.closeDelete();

                await this.$router.push({name: 'moderators-posts'});
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
                await PostService.restore({
                    id: this.item.id,
                    reason: this.action.reason
                });

                this.$toast.success('Post restored successfully');

                this.$root.$emit('gcLoading', 0);

                this.closeRestore();

                await this.$router.push({name: 'moderators-posts'});

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
