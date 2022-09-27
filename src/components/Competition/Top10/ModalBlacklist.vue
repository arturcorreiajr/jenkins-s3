<template>
    <div>
        <modal :title="`Top10 Ranking - Add user in blacklist`" @close="close" :open="open">
            <template v-slot:content>
                <div>
                    <p>
                        Are you sure you want to add the user
                        <b class="text-primary">{{ item.user ? item.user.email : '' }}</b>
                        to the <b class="text-dark">blacklist</b> ?
                    </p>
                    <div class="form-group text-start mt-3">
                        <textarea class="form-control" v-model="reason" placeholder="Reason" />
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <button class="btn btn-sm btn-primary me-2" @click="addUserInBlacklist">
                    Confirm
                </button>

                <button class="btn btn-sm btn-secondary" @click="close">
                    Cancel
                </button>
            </template>
        </modal>
    </div>
</template>
<script>
import Modal from "../../Shared/Modal/Modal";
import Top10Service from "../../../services/Competition/Top10Service";

export default {
    name: 'Top10ModalBlacklist',
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
        },
        theme: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            reason: null
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', false);
            this.reason = null;
        },
        async addUserInBlacklist() {
            if (!this.reason) {
                this.$toast.error('Reason is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    id: this.item.user.id,
                    reason: this.reason,
                    theme: this.theme,
                };

                await Top10Service.blacklist(params)

                this.$root.$emit('gcLoading', 0);
                this.$toast.success(`User has been blacklisted in ${this.theme}.`)
                this.close();
                this.$emit('addedInBlacklist');
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
                this.$root.$emit('gcLoading', 0);
            }
        }
    },
}
</script>
<style scoped>
</style>
