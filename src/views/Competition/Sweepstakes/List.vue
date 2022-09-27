<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b>S</b>weepstakes</h2>
            <h3>Manage sweepstakes</h3>
        </div>

        <div class="row">
            <div class="col-3">
                <small class="text-muted">Region</small>
                <multiselect :multiple="false"
                             :searchable="true"
                             v-model="filter.region"
                             label="label"
                             placeholder="Select a region"
                             required
                             :options="regionsWithoutAll"></multiselect>
            </div>
            <div class="col-9">
                <button class="btn btn-primary btn-sm mt-4" @click="search">
                    <b-icon-search></b-icon-search>
                    Search
                </button>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-3 mt-3 d-flex d-inline-block">
                <div class="last-sweepstake me-2">Last sweepstake</div>
                <div class="others-1 me-2">Others</div>
                <div class="others-2">Others</div>
            </div>
        </div>

        <div v-show="this.items.length">
            <gc-table
                class=""
                :items="items"
                :fields="fields"
                :limit="10">
                <template v-slot:custom1="data">
                    <p>{{ getReference(data.row.cycleReference) }}</p>
                </template>
                <template v-slot:custom2="data">
                    <span class="badge bg-success" v-show="data.row.validated === true">Validated</span>
                    <span class="badge bg-danger" v-show="data.row.validated === false">Disqualified</span>
                    <span class="badge bg-secondary" v-show="data.row.validated === null">Pendent</span>
                </template>
                <template v-slot:actions="data">
                    <button class="btn btn-sm btn-success me-2" v-show="data.row.validated === null"
                            @click="openValidate(data.row)">
                        <b-icon-check-circle-fill></b-icon-check-circle-fill>
                        Validate
                    </button>
                    <button class="btn btn-sm btn-danger" v-show="data.row.validated === null"
                            @click="openDisqualify(data.row)">
                        <b-icon-x-circle-fill></b-icon-x-circle-fill>
                        Disqualify
                    </button>
                </template>
            </gc-table>
        </div>

        <!-- Disqualify Modal-->
        <modal :title="`Disqualify winner`" @close="closeModal" :open="openDisqualifyModal" @confirm="disqualify">
            <template v-slot:content>
                <p>Are you sure you want to <b class="text-danger">disqualify</b> the sweepstakes winner?</p>
                <textarea class="form-control mt-2" placeholder="Reason" v-model="reason"></textarea>
            </template>
        </modal>

        <!-- Validate Modal-->
        <modal :title="`Validate winner`" @close="closeModal" :open="openValidateModal" @confirm="validateWinner">
            <template v-slot:content>
                <p>Are you sure you want to <b class="text-success">validate</b> the sweepstakes winner?</p>
            </template>
        </modal>
    </div>
</template>
<script>
import GcTable from "../../../components/Shared/GcTable";
import Multiselect from "vue-multiselect";
import SweepstakeService from "../../../services/Competition/SweepstakeService";
import moment from 'moment';
import RegionMixin from "../../../mixins/Region";
import Modal from "../../../components/Shared/Modal/Modal";

export default {
    name: 'Sweepstakes',
    components: {GcTable, Multiselect, Modal},
    mixins: [RegionMixin],
    data() {
        return {
            items: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'custom1', label: 'Sweepstake date', sortable: true},
                {key: 'totalCoupons', label: 'Number of coupons', sortable: true},
                {key: 'couponId', label: 'Coupon id', sortable: true},
                {key: 'winner.id', label: 'Winner id', sortable: true},
                {key: 'winner.username', label: 'Winner username', sortable: true},
                {key: 'winner.email', label: 'Winner Email', sortable: true},
                {key: 'custom2', label: 'Status', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            filter: {
                region: {value: 'world', label: 'World'},
            },
            selected: {},
            openDisqualifyModal: false,
            openValidateModal: false,
            reason: null
        }
    },
    mounted() {
        if (this.filter.region) {
            this.search();
        }
    },
    computed: {},
    methods: {
        async search() {
            this.items = [];

            await this.getItems();
        },
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    limit: 9999,
                    page: 1,
                };

                if (this.filter.region.value === 'IN') {
                    params.country = this.filter.region.value;
                }

                const {data} = await SweepstakeService.get(params);

                if (data.items && data.items.length) {
                    const items = data.items.map(el => {
                        if (el.lastCycle) {
                            el._rowVariant = 'primary';
                        }

                        return el;
                    });

                    this.items = this.items.concat(items);
                } else {
                    this.$toast.info('No results found.')
                }
            } catch (e) {
                this.$toast.error(e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        getReference(date) {
            return moment(date, 'YYYYMMDD').format('MM/DD/YYYY');
        },
        openDisqualify(item) {
            this.item = item;
            this.openDisqualifyModal = true;
        },
        async disqualify() {
            if (!this.validateReason()) {
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    reason: this.reason,
                    electNewWinner: 1
                };

                await SweepstakeService.disqualify(this.item.id, params);
                this.$root.$emit('gcLoading', 0);
                this.$toast.success('The winner was successfully disqualified.');
                this.closeModal();
                await this.search();
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
                this.$root.$emit('gcLoading', 0);
            }
        },
        openValidate(item) {
            this.item = item;
            this.openValidateModal = true;
        },
        async validateWinner() {
            this.$root.$emit('gcLoading', 1);

            try {
                await SweepstakeService.validate(this.item.id);
                this.$root.$emit('gcLoading', 0);
                this.$toast.success('The winner was successfully validated.');
                this.closeModal();
                await this.search();
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
                this.$root.$emit('gcLoading', 0);
            }
        },
        closeModal() {
            this.item = {};
            this.openDisqualifyModal = false;
            this.openValidateModal = false;
            this.reason = null;
        },
        validateReason() {
            if (!this.reason) {
                this.$toast.error('Reason is required');
                return false;
            }

            return true;
        }
    }
}
</script>
<style scoped>
.last-sweepstake:before, .others-1:before, .others-2:before {
    width: 10px;
    height: 10px;
    content: '';
    display: inline-block;
    margin-right: .25em;
    border-radius: 2px;
    border: solid 1px #ddd;
}

.last-sweepstake:before {
    background: var(--color-table-primary);
}

.others-1:before {
    background: white;
}

.others-2:before {
    background: #dee2e6;
}
</style>
