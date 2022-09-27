<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b>H</b>ashtag <b>C</b>ontest</h2>
            <h3>Manage hashtag contest</h3>
        </div>

        <div class="row">
            <div class="col-3">
                <small class="text-muted">Status</small>
                <multiselect :multiple="false"
                             :searchable="true"
                             v-model="filter.status"
                             label="label"
                             placeholder="Select a status"
                             required
                             :options="status"></multiselect>
            </div>
            <div class="col-3">
                <small class="text-muted">Region</small>
                <multiselect :multiple="false"
                             :searchable="true"
                             v-model="filter.region"
                             label="label"
                             placeholder="Select a region"
                             required
                             :options="regions"></multiselect>
            </div>
            <div class="col-4">
                <button class="btn btn-primary btn-sm mt-4" @click="search">
                    <b-icon-search></b-icon-search>
                    Search
                </button>
            </div>
            <div class="col-2">
                <a @click="$router.push({name: 'competition-hashtag-contest-create'})" class="btn btn-sm btn-success float-end"
                   v-b-tooltip.hover
                   title="Create user">
                    Create
                </a>
            </div>
        </div>

        <div v-show="this.items.length">
            <gc-table
                class="mt-3"
                :items="items"
                :fields="fields"
                :limit="10"
            >
                <template v-slot:custom1="data">
                    <div class="cover-hashtag text-center">
                        <img class="img-thumbnail" :src="data.row.coverHashtag || require('@/assets/not-found.png')" alt="Cover hashtag - GotChosen">
                        <p>{{ data.row.id }}</p>
                    </div>
                </template>

                <template v-slot:custom2="data">
                    <span class="badge bg-secondary">{{ getStatus(data.row.status) }}</span>
                </template>
                <template v-slot:actions="data">
                    <a class="btn btn-sm btn-primary me-2" v-b-tooltip.hover title="Edit contest"
                       @click="$router.push({name: 'competition-hashtag-contest-edit', params: { id: data.row.id }})">
                        <b-icon-pencil-square></b-icon-pencil-square>
                    </a>
                </template>
            </gc-table>

        </div>
    </div>
</template>
<script>
import GcTable from "../../../components/Shared/GcTable";
import Multiselect from "vue-multiselect";
import ContestService from "../../../services/Competition/ContestService";
import moment from 'moment';
import RegionMixin from "../../../mixins/Region";

export default {
    name: 'HashtagContests',
    components: {GcTable, Multiselect},
    mixins: [RegionMixin],
    data() {
        return {
            items: [],
            fields: [
                {key: 'custom1', label: 'Id', sortable: false},
                {key: 'hashtag', label: 'Hashtag', sortable: true},
                {key: 'start', label: 'Start', sortable: true},
                {key: 'end', label: 'End', sortable: true},
                {key: 'custom2', label: 'Status', sortable: true},
                {key: 'region', label: 'Region', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            status: [
                {value: 'toStart', label: 'To Start'},
                {value: 'inProgress', label: 'In Progress'},
                {value: 'finishedWithNoWinners', label: 'Finished without winners'},
                {value: 'finished', label: 'Finished'},
            ],
            filter: {
                status: {value: 'toStart', label: 'To Start'},
                region: {value: 'all', label: 'All'},
            }
        }
    },
    mounted() {
        if (this.filter.status && this.filter.region) {
            this.search();
        }
    },
    computed: {},
    methods: {
        search() {
            this.items = [];
            this.getItems();
        },
        async getItems() {
            if (!this.filter.status) {
                this.$toast.error('Status is required.')
                return;
            }

            if (!this.filter.region) {
                this.$toast.error('Region is required.')
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const {data} = await ContestService.get({
                    country: this.filter.region.value,
                    status: this.filter.status.value,
                    limit: 9999
                });

                if (data.items.length) {
                    this.items = this.makeItems(data.items);
                } else {
                    this.$toast.info('No results found.')
                }
            } catch (e) {
                this.$toast.error(e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        makeItems(data) {
            return data.map(i => {
                return {
                    id: i.id,
                    hashtag: i.hashtag.hashtag,
                    coverHashtag: i.hashtag.coverUrl,
                    status: i.statusFilters,
                    start: moment(String(i.startDate)).format('MM/DD/YYYY hh:mm'),
                    end: moment(String(i.endDate)).format('MM/DD/YYYY hh:mm'),
                    region: i.country === 'IN' ? 'India' : (i.country || 'World')
                };
            });
        },
        getStatus(status) {
            const obj = this.status.filter(el => el.value === status);

            if (obj.length) {
                return obj[0].label;
            }

            return 'None';
        }
    }
}
</script>
<style scoped>
.cover-hashtag {
    position: relative;
    overflow: hidden;
    width: 70px;
}

.cover-hashtag p {
    position: absolute;
    left: 0;
    bottom: -12px;
    background: rgba(0, 0, 0, .4);
    color: white;
    width: 100%;
    font-weight: bold;
}

.img-thumbnail {
    width: 70px;
    height: 70px;
}
</style>
