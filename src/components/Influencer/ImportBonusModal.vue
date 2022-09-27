<template>
    <div>
        <modal :title="`Import bonus`" @close="close" :open="open">
            <template v-slot:content>
                <div class="mb-4 text-start">
                    <div class="form-group">
                        <label for="">Description file</label>
                        <input type="text" v-model="description" class="form-control" placeholder="GotCoins"/>
                    </div>

                    <div class="form-group mt-3">
                        <label class="mb-2 me-1">Default file example to <b class="text-success">ADD</b> Bonus X</label>
                        <a href="" target="_blank" class="form-text text-muted">download</a>
                        <input type="file" class="form-control"
                               @change="previewAttachment"
                               ref="attachment">
                    </div>

                    <div class="mt-3 d-flex justify-content-between">
                        <button class="btn btn-sm btn-success" @click="importBonus">
                            Import
                        </button>

                        <json-c-s-v :data="json" v-show="json.length">
                            <button class="btn btn-sm btn-info">
                                <b-icon-file-arrow-down/>
                                Download
                            </button>
                        </json-c-s-v>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <button class="btn btn-sm btn-secondary" @click="close">
                    Close
                </button>
            </template>
        </modal>
    </div>
</template>
<script>
import Modal from "../Shared/Modal/Modal";
import AmbassadorService from "../../services/Influencers/AmbassadorService";
import JsonCSV from "vue-json-csv";


export default {
    name: 'ImportInfluencerBonusModal',
    components: {Modal, JsonCSV},
    props: {
        open: {
            Type: Boolean,
            default: true,
        },
        item: {
            Type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            attachment: null,
            json: [],
            description: null
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.attachment = null;
            this.description = null;
            this.json = [];
            this.$emit('close', false);
        },
        previewAttachment() {
            this.attachment = this.$refs.attachment.files[0] || null;
        },
        async importBonus() {
            if (!this.attachment) {
                this.$toast.error('File is required');
                return;
            }

            if (!this.description) {
                this.$toast.error('Description is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            const formData = this.makeFormData();

            const {data} = await AmbassadorService.importBonus(formData)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            this.$root.$emit('gcLoading', 0);

            if (!data.success) {
                this.$toast.error(data.message);
                return;
            }

            if (data.length) {
                this.json = data.message;
            }

            this.close();
            this.$toast.success(data.message);
        },
        makeFormData() {
            const formData = new FormData();
            formData.append('campaign', this.item.id);
            formData.append('description', this.description);
            formData.append('file', this.attachment);
            return formData;
        }
    },
}
</script>
<style scoped>
</style>
