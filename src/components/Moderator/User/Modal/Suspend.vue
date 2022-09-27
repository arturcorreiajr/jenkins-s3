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
                <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1" @click="confirm(2)">
                    2 days
                </button>
                <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1" @click="confirm(7)">
                    7 days
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
    name: 'ModalSuspend',
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
        this.$root.$on('modalSuspend', val => this.show = val);
    },
    methods: {
        confirm(days) {
            this.$emit('suspend', {
                days: days,
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
