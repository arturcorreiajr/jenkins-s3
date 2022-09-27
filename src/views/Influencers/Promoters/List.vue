<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>P</b>romoters</h2>
                <h3>Manage all indian promoters</h3>
            </div>

            <a @click="$router.push({name: 'promoters-create'})" class="btn btn-sm btn-primary" v-b-tooltip.hover
               title="Create campaign">
                Create Campaign
            </a>

            <gc-table
                class="mt-3"
                :items="items"
                :fields="fields"
                :sort-by-field="`id`"
                :limit="10"
            >
                <template v-slot:custom1="data">
                    <span class="badge text-capitalize" :class="getStatusClass(data.row.status)">{{ data.row.status }}</span>
                </template>
                <template v-slot:custom2="data">
                    <b class="text-capitalize">{{ data.row.type }}</b>
                </template>
                <template v-slot:actions="data">
                    <!-- Campaign actions -->
                    <b-dropdown class="me-2">
                        <template #button-content>
                            <button class="btn btn-sm btn-primary">
                                <b-icon-list/>
                                Actions
                            </button>
                        </template>

                        <!-- Actions -->
                        <b-dropdown-item v-show="data.row.status !== 'closed'"
                                         @click="$router.push({name: 'promoters-edit', params: {id: data.row.id}})">
                            <b-icon-pencil-fill scale="0.7"/>
                            Edit
                        </b-dropdown-item>
                        <b-dropdown-item @click="importInfluencer(data.row)" v-show="data.row.status !== 'closed'">
                            <b-icon-file-earmark-arrow-up scale="0.7"/>
                            Import
                        </b-dropdown-item>
                        <b-dropdown-divider v-show="data.row.status !== 'closed'"/>
                        <b-dropdown-item @click="historyInfluencer(data.row)">
                            <b-icon-person-lines-fill scale="0.7"/>
                            History
                        </b-dropdown-item>
                        <b-dropdown-item
                            @click="$router.push({name: 'promoters-report', params: {start: data.row.start, end: data.row.end, reportType: data.row.type}})">
                            <b-icon-list-task scale="0.7"/>
                            Report
                        </b-dropdown-item>
                        <b-dropdown-divider v-show="data.row.status === 'pending'"></b-dropdown-divider>
                        <b-dropdown-item v-show="data.row.status === 'pending'" @click="removeCampaign(data.row)">
                            <b-icon-trash2-fill scale="0.7"/>
                            Remove
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
            </gc-table>

            <!-- Modal import influencer -->
            <import-influencer-modal :open="modal.importInfluencer"
                                     :item="selected"
                                     :context="'Promoters'"
                                     @close="closeModal"></import-influencer-modal>

            <!-- Modal history influencer -->
            <history-influencer-modal :open="modal.historyInfluencer"
                                      :item="selected"
                                      :context="'Promoters'"
                                      @close="closeModal"></history-influencer-modal>

            <!-- Modal remove campaign -->
            <remove-campaign-modal :open="modal.removeCampaign"
                                   :item="selected"
                                   :context="'Promoters'"
                                   @removed="getItems"
                                   @close="closeModal"></remove-campaign-modal>
        </div>
    </div>
</template>
<script>
import GcTable from "../../../components/Shared/GcTable";
import PromoterService from "../../../services/Influencers/PromoterService";
import ImportInfluencerModal from "../../../components/Influencer/ImportModal";
import HistoryInfluencerModal from "../../../components/Influencer/HistoryModal";
import RemoveCampaignModal from "../../../components/Influencer/RemoveCampaignModal";

export default {
    name: 'Promoters',
    components: {
        RemoveCampaignModal, HistoryInfluencerModal, ImportInfluencerModal, GcTable
    },
    data() {
        return {
            name: null,
            items: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'name', label: 'Campaign', sortable: true},
                {key: 'start', label: 'Start', sortable: true},
                {key: 'end', label: 'End', sortable: true},
                {key: 'custom1', label: 'Status', sortable: false},
                {key: 'custom2', label: 'Type', sortable: false},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            limit: 10,
            user: {},
            modal: {
                importInfluencer: false,
                historyInfluencer: false,
                removeCampaign: false,
            },
            selected: {}
        };
    },
    mounted() {
        this.getItems();
    },
    methods: {
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await PromoterService.get();

            if (data.length) {
                this.items = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        getStatusClass(val) {
            const status = {
                pending: 'bg-warning',
                live: 'bg-success',
                closed: 'bg-secondary'
            };

            return status[val];
        },
        importInfluencer(item) {
            this.selected = item;
            this.modal.importInfluencer = true;
        },
        historyInfluencer(item) {
            const selected = structuredClone(item); /* eslint-disable-line */
            selected.action = 'history';
            this.selected = selected;
            this.modal.historyInfluencer = true;
        },
        removeCampaign(item) {
            this.selected = item;
            this.modal.removeCampaign = true;
        },
        closeModal() {
            this.modal.importInfluencer = false;
            this.modal.historyInfluencer = false;
            this.modal.removeCampaign = false;
            this.selected = {};
        }
    },
}
</script>
<style scoped>
.dropdown-toggle {
    background: transparent !important;
    border: none !important;
}
</style>
