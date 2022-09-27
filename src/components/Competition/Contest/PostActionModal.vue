<template>
    <div>
        <modal :title="`Post actions`" @close="close" :open="open">
            <template v-slot:content>
                <!-- Disqualify-->
                <div v-show="disqualify">
                    <p>Are you sure you want to <b>disqualify</b> this post?</p>
                    <button class="btn btn-sm btn-primary me-2" @click="disqualifyPost">
                        Confirm
                    </button>

                    <button class="btn btn-sm btn-secondary" @click="close">
                        Cancel
                    </button>
                </div>

                <!-- Restore -->
                <div v-show="restore">
                    <p>Are you sure you want to <b>restore</b> this post?</p>
                    <button class="btn btn-sm btn-primary me-2" @click="restorePost">
                        Confirm
                    </button>

                    <button class="btn btn-sm btn-secondary" @click="close">
                        Cancel
                    </button>
                </div>
            </template>
            <template v-slot:footer>&nbsp;</template>
        </modal>
    </div>
</template>
<script>
import Modal from "../../Shared/Modal/Modal";
import ContestService from "../../../services/Competition/ContestService";

export default {
    name: 'PostActionModal',
    components: {Modal},
    props: {
        open: {
            Type: Boolean,
            default: true,
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            disqualify: false,
            restore: false,
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', false);
        },
        async disqualifyPost() {
            if (!this.item.contest || !this.item.post) {
                this.$toast.error('Could not disqualify post');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                await ContestService.disqualify({
                    contest: this.item.contest,
                    post: this.item.post,
                    reason: 'Default'
                });

                this.$root.$emit('gcLoading', 0);
                this.$toast.success('Post was disqualified.')
                this.close();
                this.$emit('disqualified');
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
                this.$root.$emit('gcLoading', 0);
            }
        },
        async restorePost() {
            if (!this.item.contest || !this.item.post) {
                this.$toast.error('Could not restore post');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                await ContestService.restore({
                    contest: this.item.contest,
                    post: this.item.post,
                    reason: 'Default'
                });

                this.$root.$emit('gcLoading', 0);
                this.$toast.success('Post was restored.')
                this.close();
                this.$emit('restored');
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
                this.$root.$emit('gcLoading', 0);
            }

        }
    },
    watch: {
        item(e) {
            if (e.action === 'restore') {
                this.restore = true;
                return;
            }

            if (e.action === 'disqualify') {
                this.disqualify = true;
                return;
            }

            this.disqualify = false;
            this.restore = false;
        }
    }
}
</script>
<style scoped>
</style>
