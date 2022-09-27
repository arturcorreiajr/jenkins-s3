<template>
    <div>
        <modal :title="`Bonus history ${item.name}`" @close="close" :open="open" :size="`xl`">
            <template v-slot:content>
                <gc-table
                    class="mt-3"
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
                    <template v-slot:custom2="data">
                        <a @click="download(data.row)" class="cursor-pointer" style="color: green;">
                            <b-icon-file-earmark-excel-fill />
                        </a>
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
import GcTable from "../../components/Shared/GcTable";
import moment from "moment";

export default {
    name: 'BonusHistoryInfluencerModal',
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
    },
    data() {
        return {
            items: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'email', label: 'User', sortable: true},
                {key: 'description', label: 'Description', sortable: true},
                {key: 'custom1', label: 'Created At', sortable: true},
                {key: 'custom2', label: 'Download', sortable: false},
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

            const {data} = await AmbassadorService.bonusHistory(this.item.id)
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
        },
        async download(item) {
            this.$root.$emit('gcLoading', 1);

            await AmbassadorService.downloadBonusFile(item.id)
                .catch(e => {
                    this.$toast.error(e);
                    this.$root.$emit('gcLoading', 0);
                });

            this.$root.$emit('gcLoading', 0);
        }
    },
    watch: {
        item(e) {
            if (e.id && e.action === 'bonusHistory') {
                this.getItems();
            }
        }
    }
}
</script>
<style scoped>
</style>
