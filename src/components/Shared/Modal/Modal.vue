<template>
    <div>
        <b-modal v-model="show" @hide="close" :size="size">
            <template #modal-header>
                <slot name="title">
                    <h5>{{ title }}</h5>
                </slot>
                <a class="cursor-pointer close-modal" @click="close">
                    <b-icon-x scale="1.5"></b-icon-x>
                </a>
            </template>
            <div class="d-block text-center">
                <slot name="content"></slot>
            </div>
            <template #modal-footer>
                <slot name="footer">
                    <button v-b-modal.modal-close_visit class="btn btn-primary btn-sm m-1" @click="confirm">
                        <b-icon-check></b-icon-check>
                    </button>
                    <button v-b-modal.modal-close_visit class="btn btn-secondary btn-sm m-1" @click="close">
                        Cancel
                    </button>
                </slot>
            </template>
        </b-modal>
    </div>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: ''
        },
        open: {
            type: Boolean,
            default :false
        },
        size: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            show: false
        }
    },
    mounted() {
        this.$root.$on('modal', (val) => {
            this.show = val;
        });
    },
    methods: {
        confirm() {
            this.$emit('confirm', true);
        },
        close() {
            this.show = false;
            this.$emit('close', false);
        },
    },
    watch: {
        open(val) {
            this.show = val;
        }
    }
}
</script>
<style scoped>

</style>
