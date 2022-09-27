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
            </div>
            <template #modal-footer>
                <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1" @click="confirm">
                    <b-icon-check></b-icon-check>
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
    name: 'ModalDelete',
    props: {
        title: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            show: false
        }
    },
    mounted() {
        this.$root.$on('modalDelete', (val) => {
            this.show = val;
        });
    },
    methods: {
        confirm() {
            this.$emit('confirm', true);
        },
        close() {
            this.show = false;
        },
    }
}
</script>
<style scoped>

</style>
