<template>
    <div>
        <div class="table-div">
            <div class="float-start me-3">
                <label class="me-1">Show</label>
                <b-form-select class="me-1" v-model="limitSelected" :options="limits"></b-form-select>
                <span>lines</span>
            </div>

            <div class="float-start" v-if="csv">
                <json-c-s-v :data="items">
                    <a class="cursor-pointer csv-icon" v-b-tooltip.hover title="Download CSV">
                        <b-icon-file-earmark-excel-fill scale="1.5"/>
                    </a>
                </json-c-s-v>
            </div>

            <div class="float-end mb-3">
                <b-form-input v-model="filter"
                              placeholder="Search in list"
                              class="mr-1"
                              autocomplete="off">
                </b-form-input>
            </div>

            <b-table
                class="table-list table table-striped"
                hover
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :striped="true"
                responsive="sm"
                :filter="filter"
                :current-page="currentPage"
                :per-page="limitSelected">

                <template #cell(custom1)="row">
                    <slot name="custom1" v-bind:row="row.item"></slot>
                </template>

                <template #cell(custom2)="row">
                    <slot name="custom2" v-bind:row="row.item"></slot>
                </template>

                <template #cell(actions)="row">
                    <slot name="actions" v-bind:row="row.item"></slot>
                </template>
            </b-table>

            <div class="d-flex justify-content-end">
                <b-pagination v-model="currentPage"
                              class="float-end m-0"
                              :total-rows="rows"
                              :per-page="limitSelected"
                              aria-controls="pagination"></b-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import JsonCSV from "vue-json-csv";

export default {
    name: 'InfluencerTable',
    components: {JsonCSV},
    props: {
        items: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        fields: {
            type: Array,
            default: () => {
                return []
            }
        },
        limit: {
            type: Number,
            default: 10
        },
        sortByField: {
            type: String,
            default: '',
        },
        csv: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentPage: 1,
            filter: null,
            sortBy: '',
            sortDesc: '',
            limits: [
                {value: 10, text: 10},
                {value: 20, text: 20},
                {value: 50, text: 50},
                {value: 100, text: 100},
                {value: 500, text: 500},
            ],
            limitSelected: 10
        };
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    mounted() {
        this.limitSelected = this.limit;

        if (this.sortByField) {
            this.sortBy = this.sortByField;
        }
    },
    methods: {
    },
}
</script>
<style scoped>
.table-div {
    padding: 1em;
    border: solid 1px #ddd;
    background: #fdfdfd;
}

.table-list {
    min-height: 200px;
}

::v-deep .sr-only {
    display: none !important;
}

.csv-icon {
    color: green;
}
</style>
