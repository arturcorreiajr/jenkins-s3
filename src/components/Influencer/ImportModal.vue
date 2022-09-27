<template>
    <div>
        <modal :title="`Import influencer in ${context}`" @close="close" :open="open">
            <template v-slot:content>
                <div class="mb-4 text-start">
                    <div class="form-group">
                        <label class="mb-2 me-1">Default file input example to <b class="text-success">ADD</b>
                            influencers</label>
                        <a href="" target="_blank" class="form-text text-muted">download</a>
                        <input type="file" class="form-control"
                               @change="previewAttachmentAdd"
                               ref="attachmentAdd">
                    </div>

                    <div class="mt-3 d-flex justify-content-between">
                        <button class="btn btn-sm btn-success" @click="add">
                            <b-icon-person-plus-fill/>
                            Add
                        </button>

                        <json-c-s-v :data="json.add" v-show="json.add.length">
                            <button class="btn btn-sm btn-info">
                                <b-icon-file-arrow-down/>
                                Download
                            </button>
                        </json-c-s-v>
                    </div>
                </div>

                <hr>

                <div class="mt-4 text-start">
                    <div class="form-group">
                        <label class="mb-2 me-1">Default file input example to <b class="text-danger">REMOVE</b>
                            influencers</label>
                        <a href="" target="_blank" class="form-text text-muted">download</a>
                        <input type="file" class="form-control"
                               @change="previewAttachmentRemove"
                               ref="attachmentRemove">
                    </div>

                    <div class="mt-3 d-flex justify-content-between">
                        <button class="btn btn-sm btn-danger" @click="remove">
                            <b-icon-person-x-fill/>
                            Remove
                        </button>

                        <json-c-s-v :data="json.remove" v-show="json.remove.length">
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
import PromoterService from "../../services/Influencers/PromoterService";
import JsonCSV from "vue-json-csv";

export default {
    name: 'ImportInfluencerModal',
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
        context: {
            Type: String,
            default: '',
        }
    },
    data() {
        return {
            attachment: {
                add: null,
                remove: null,
            },
            json: {
                add: [],
                remove: []
            }
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.attachment = {
                add: null,
                remove: null
            };

            this.json = {
                add: [],
                remove: []
            };

            this.$emit('close', false);
        },
        previewAttachmentAdd() {
            this.attachment.add = this.$refs.attachmentAdd.files[0] || null;
        },
        previewAttachmentRemove() {
            this.attachment.remove = this.$refs.attachmentRemove.files[0] || null;
        },
        async add() {
            if (!this.attachment.add) {
                this.$toast.error('File is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            const formData = this.makeFormData('add');

            let service = AmbassadorService;

            if (this.context === 'Promoters') {
                service = PromoterService;
            }

            const {data} = await service.import(formData)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.success) {
                this.close();
                this.$root.$emit('gcLoading', 0);
                this.$toast.success(data.message);
                return;
            }

            this.json.add = data.message;
            this.$root.$emit('gcLoading', 0);
        },
        async remove() {
            if (!this.attachment.remove) {
                this.$toast.error('File is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            const formData = this.makeFormData('remove');

            const {data} = await AmbassadorService.import(formData)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.success) {
                this.close();
                this.$root.$emit('gcLoading', 0);
                this.$toast.success(data.message);
                return;
            }

            this.json.remove = data.message;
            this.$root.$emit('gcLoading', 0);
        },
        makeFormData(action) {
            const formData = new FormData();
            formData.append('campaign', this.item.id);
            formData.append('action', action);
            formData.append('file', this.attachment[action]);
            return formData;
        }
    },
}
</script>
<style scoped>
</style>
