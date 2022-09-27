<template>
    <div>
        <modal :title="`Add parent`" @close="close" :open="open">
            <template v-slot:content>
                <div class="text-start">
                    <label class="form-label">Parent email</label>
                    <input type="email" class="form-control" placeholder="agency@agency.com" v-model.trim="email">
                </div>
            </template>

            <template v-slot:footer>
                <button class="btn btn-sm btn-primary" @click="add">
                    Add
                </button>

                <button class="btn btn-sm btn-secondary" @click="close">
                    Close
                </button>
            </template>
        </modal>
    </div>
</template>
<script>
import Modal from "../Shared/Modal/Modal";

export default {
    name: 'ParentInfluencerModal',
    components: {Modal},
    props: {
        open: {
            Type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            email: null,
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', false);
            this.email = null;
        },
        add() {
            this.$emit('parent', this.email);
            this.close();
        }
    },
}
</script>
<style scoped>
</style>
