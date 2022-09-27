<template>
    <div>
        <b-modal v-model="show" @hide="close">
            <template #modal-header>
                <h5>{{ title }}</h5>
                <a class="cursor-pointer close-modal" @click="close">
                    <b-icon-x scale="1.5"></b-icon-x>
                </a>
            </template>
            <div class="d-block text-center">
                <slot name="content"></slot>

                <div class="form-group text-start">
                    <label>Attachment</label>
                    <input type="file" class="form-control" @change="previewAttachment" ref="attachment">
                </div>

                <div class="form-group text-start mt-3">
                    <label>Reason</label>
                    <textarea class="form-control" v-model="reason"></textarea>
                </div>
            </div>
            <template #modal-footer>
                <button v-b-modal.modal-close_visit class="btn btn-info btn-sm m-1" @click="confirm">
                    <b-icon-check-circle-fill></b-icon-check-circle-fill>
                    Confirm
                </button>
                <button v-b-modal.modal-close_visit class="btn btn-secondary btn-sm m-1" @click="close">
                    Cancel
                </button>
            </template>
        </b-modal>
    </div>
</template>
<script>
export default {
    name: 'ModalVerify',
    props: {
        title: {
            type: String,
            default: 'Verify user'
        },
    },
    data() {
        return {
            show: false,
            reason: null,
            attachment: null
        }
    },
    mounted() {
        this.$root.$on('modalVerify', val => this.show = val);
    },
    methods: {
        confirm() {
            this.$emit('verify', {
                reason: this.reason,
                attachment: this.attachment
            });
        },
        close() {
            this.reason = null;
            this.attachment = null;
            this.show = false;
        },
        previewAttachment() {
            this.attachment = this.$refs.attachment.files[0] || null;
        },
    }
}
</script>
<style scoped>

</style>
