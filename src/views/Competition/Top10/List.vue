<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b>T</b>op10 <b>R</b>anking <b class="text-primary">{{ filter.region ? `${filter.region.label}` : '' }}</b></h2>
            <h3>Manage top10 ranking</h3>
        </div>

        <div class="row">
            <div class="col-3">
                <small class="text-muted">Region</small>
                <multiselect :multiple="false"
                             :searchable="true"
                             v-model="filter.region"
                             label="label"
                             placeholder="Select a region"
                             @input="search"
                             required
                             :options="regionsWithoutAll"></multiselect>
            </div>
            <div class="col-9">
                <button class="btn btn-primary btn-sm mt-4" @click="search" v-b-tooltip.hover="`Search with filter`">
                    <b-icon-search></b-icon-search>
                    Search
                </button>
            </div>
        </div>

        <div v-show="this.items.length" class="mt-4">
            <gc-table
                :items="items"
                :fields="fields"
                :sort-by-field="`reference`"
                :limit="10">
                <template v-slot:custom1="data">
                    <span class="badge bg-secondary" v-show="data.row.status === 'finished'">Past Winners</span>
                    <span class="badge bg-info" v-show="data.row.status === 'finishedWithNoWinners'">Pending Validation</span>
                    <span class="badge bg-success" v-show="data.row.status === 'inProgress'">Open Ranking</span>
                </template>
                <template v-slot:actions="data">
                    <a class="btn btn-sm btn-primary"
                       @click="$router.push({name: 'competition-top10-manage', params: { reference: data.row.reference, region: filter.region.value }})"
                       v-b-tooltip.hover="`Open this month`">
                        <b-icon-eye-fill/>
                    </a>
                </template>
            </gc-table>
        </div>
    </div>
</template>
<script>
import GcTable from "../../../components/Shared/GcTable";
import Multiselect from "vue-multiselect";
import Top10Service from "../../../services/Competition/Top10Service";
import RegionMixin from "../../../mixins/Region";

export default {
    name: 'Top10',
    components: {GcTable, Multiselect},
    mixins: [RegionMixin],
    data() {
        return {
            items: [],
            fields: [
                {key: 'reference', label: 'Reference', sortable: true},
                {key: 'custom1', label: 'Status', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            filter: {
                region: {value: 'world', label: 'World'},
            },
        }
    },
    mounted() {
        if (this.filter.region) {
            this.search();
        }
    },
    computed: {

    },
    methods: {
        async search() {
            this.items = [];

            if (this.filter.region) {
                await this.getItems();
            }
        },
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            try {
                const {data} = await Top10Service.get();

                if (data.length) {
                    this.items = this.makeData(data);
                }
            } catch (e) {
                this.$toast.error(e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        makeData(data) {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            data.push({
                reference: `${year}-${month < 10 ? `0${month}` : month}`,
                status: 'inProgress'
            });

            return data;
        }
    }
}
</script>
<style scoped>
</style>
