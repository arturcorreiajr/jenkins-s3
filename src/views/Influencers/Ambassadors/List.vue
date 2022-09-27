<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>A</b>mbassadors</h2>
                <h3>Manage all ambassadors</h3>
            </div>

            <a @click="$router.push({name: 'ambassadors-create'})" class="btn btn-sm btn-primary" v-b-tooltip.hover
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
                                         @click="$router.push({name: 'ambassadors-edit', params: {id: data.row.id}})">
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
                            @click="$router.push({name: 'ambassadors-report', params: {start: data.row.start, end: data.row.end}})">
                            <b-icon-list-task scale="0.7"/>
                            Report
                        </b-dropdown-item>
                        <b-dropdown-divider v-show="data.row.status === 'pending'"></b-dropdown-divider>
                        <b-dropdown-item v-show="data.row.status === 'pending'" @click="removeCampaign(data.row)">
                            <b-icon-trash2-fill scale="0.7"/>
                            Remove
                        </b-dropdown-item>
                    </b-dropdown>

                    <!-- Bonus actions -->
                    <b-dropdown v-if="data.row.status === 'closed'">
                        <template #button-content>
                            <button class="btn btn-sm btn-success">
                                <b-icon-currency-dollar/>
                                Bonus action
                            </button>
                        </template>

                        <!-- Actions -->
                        <b-dropdown-item @click="importBonus(data.row)">
                            <b-icon-file-earmark-arrow-up scale="0.7"/>
                            Import
                        </b-dropdown-item>
                        <b-dropdown-item @click="bonusHistory(data.row)">
                            <b-icon-person-lines-fill scale="0.7"/>
                            History
                        </b-dropdown-item>
                        <b-dropdown-item
                            @click="$router.push({name: 'ambassadors-bonus-report', params: {start: data.row.start, end: data.row.end}})">
                            <b-icon-list-task scale="0.7"/>
                            Report
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
            </gc-table>

            <!-- Modal import influencer -->
            <import-influencer-modal :open="modal.importInfluencer"
                                     :item="selected"
                                     :context="'Ambassadors'"
                                     @close="closeModal"></import-influencer-modal>

            <!-- Modal history influencer -->
            <history-influencer-modal :open="modal.historyInfluencer"
                                      :item="selected"
                                      :context="'Ambassadors'"
                                      @close="closeModal"></history-influencer-modal>

            <!-- Modal remove campaign -->
            <remove-campaign-modal :open="modal.removeCampaign"
                                   :item="selected"
                                   @removed="getItems"
                                   :context="'Ambassadors'"
                                   @close="closeModal"></remove-campaign-modal>

            <!-- Modal import bonus -->
            <import-influencer-bonus-modal :open="modal.importBonus"
                                           :item="selected"
                                           @close="closeModal"></import-influencer-bonus-modal>

            <!-- Modal bonus history -->
            <bonus-history-influencer-modal :open="modal.bonusHistory"
                                      :item="selected"
                                      @close="closeModal"></bonus-history-influencer-modal>
        </div>
    </div>
</template>
<script>
import GcTable from "../../../components/Shared/GcTable";
import AmbassadorService from "../../../services/Influencers/AmbassadorService";
import ImportInfluencerModal from "../../../components/Influencer/ImportModal";
import HistoryInfluencerModal from "../../../components/Influencer/HistoryModal";
import RemoveCampaignModal from "../../../components/Influencer/RemoveCampaignModal";
import ImportInfluencerBonusModal from "../../../components/Influencer/ImportBonusModal";
import BonusHistoryInfluencerModal from "../../../components/Influencer/BonusHistoryModal";

export default {
    name: 'Ambassadors',
    components: {
        BonusHistoryInfluencerModal,
        ImportInfluencerBonusModal, RemoveCampaignModal, HistoryInfluencerModal, ImportInfluencerModal, GcTable},
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
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            limit: 10,
            user: {},
            modal: {
                importInfluencer: false,
                historyInfluencer: false,
                removeCampaign: false,
                importBonus: false,
                bonusHistory: false,
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

            const {data} = await AmbassadorService.get();

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
        importBonus(item) {
            this.selected = item;
            this.modal.importBonus = true;
        },
        bonusHistory(item) {
            const selected = structuredClone(item); /* eslint-disable-line */
            selected.action = 'bonusHistory';
            this.selected = selected;
            this.modal.bonusHistory = true;
        },
        closeModal() {
            this.modal.importInfluencer = false;
            this.modal.historyInfluencer = false;
            this.modal.removeCampaign = false;
            this.modal.importBonus = false;
            this.modal.bonusHistory = false;
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
