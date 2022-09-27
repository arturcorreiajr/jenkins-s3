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
                    <label>Reason</label>
                    <textarea class="form-control" v-model="reason"></textarea>
                </div>
            </div>
            <template #modal-footer>
                <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1" @click="confirm">
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
    name: 'ModalBan',
    props: {
        title: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            show: false,
            reason: null
        }
    },
    mounted() {
        this.$root.$on('modalBan', val => this.show = val);
    },
    methods: {
        confirm() {
            this.$emit('ban', {
                reason: this.reason
            });
        },
        close() {
            this.reason = null;
            this.show = false;
        },
    }
}
</script>
<style scoped>

</style>
