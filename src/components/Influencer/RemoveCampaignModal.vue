<template>
    <div>
        <modal :title="`Remove ${item.name} ${item.type || ''} in ${context}`" @close="close" :open="open">
            <template v-slot:content>
                <p>
                    Are you sure you want to <b class="text-danger">remove</b> campaign <b>{{ item.name }}</b> ?
                </p>
            </template>
            <template v-slot:footer>
                <button class="btn btn-sm btn-danger" @click="remove">
                    Remove
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
import AmbassadorService from "../../services/Influencers/AmbassadorService";
import PromoterService from "../../services/Influencers/PromoterService";

export default {
    name: 'RemoveCampaignModal',
    components: {Modal},
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
            default: ''
        }
    },
    data() {
        return {}
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', false);
            this.items = [];
        },
        async remove() {
            this.$root.$emit('gcLoading', 1);

            let service = AmbassadorService;

            if (this.context === 'Promoters') {
                service = PromoterService
            }

            await service.remove(this.item.id)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            this.$root.$emit('gcLoading', 0);
            this.close();
            this.$emit('removed');
            this.$toast.success('Campaign removed.');
        }
    },
}
</script>
<style scoped>
</style>
