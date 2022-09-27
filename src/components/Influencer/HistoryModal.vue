<template>
    <div>
        <modal :title="`History ${item.name} in ${context}`" @close="close" :open="open" :size="`xl`">
            <template v-slot:content>
                <gc-table
                    class="mt-3 table-gc"
                    :items="items"
                    :fields="fields"
                    :sort-by-field="`id`"
                    :limit="10"
                    :csv="true"
                    v-show="items.length"
                >
                    <template v-slot:custom1="data">
                        {{ getDatetime(data.row.createdAt) }}
                    </template>
                </gc-table>

                <div class="alert alert-primary" role="alert" v-show="!items.length">
                    No content
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
import GcTable from "../../components/Shared/GcTable";
import moment from "moment";

export default {
    name: 'HistoryInfluencerModal',
    components: {Modal, GcTable},
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
        },
    },
    data() {
        return {
            items: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'user', label: 'User', sortable: true},
                {key: 'action', label: 'Action', sortable: true},
                {key: 'ambassador_email', label: 'Ambassador', sortable: true},
                {key: 'agency_email', label: 'Agency', sortable: true},
                {key: 'reason', label: 'Reason', sortable: true},
                {key: 'custom1', label: 'Date', sortable: true},
            ]
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', false);
            this.items = [];
        },
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            let service = AmbassadorService;

            if (this.context === 'Promoters') {
                service = PromoterService;
            }

            const {data} = await service.history(this.item.id)
                .catch(e => {
                    this.$toast.error(e);
                    this.$root.$emit('gcLoading', 0);
                });

            if (data.length) {
                this.items = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        getDatetime(datetimeUtc) {
            return moment(datetimeUtc).format("MM/DD/YYYY HH:mm:ss");
        }
    },
    watch: {
        item(e) {
            if (e.id && e.action === 'history') {
                this.getItems();
            }
        }
    }
}
</script>
<style scoped>
.table-gc {
    font-size: 14px !important;
}
</style>
