<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b>C</b>omments</h2>
            <h3>Manage reported comments</h3>
        </div>

        <filter-date @search="search"></filter-date>

        <gc-table
            v-if="items.length"
            class="mt-5"
            :items="items"
            :fields="fields"
            :limit="this.pagination.limit"
        >
            <template v-slot:actions="data">
                <a class="btn btn-sm btn-primary" v-b-tooltip.hover title="See comment"
                   @click="$router.push({name: 'moderators-comments-edit', params: { id: data.row.id }})">
                    <b-icon-eye-fill></b-icon-eye-fill>
                </a>
            </template>
        </gc-table>
    </div>
</template>
<script>
import FilterDate from "../../../components/Moderator/FilterDate";
import CommentService from "../../../services/Moderator/CommentService";
import {mapState} from "vuex";
import GcTable from "../../../components/Shared/GcTable";

export default {
    name: 'ReportedComments',
    components: {FilterDate, GcTable},
    data() {
        return {
            items: [],
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'reporter', label: 'Informant username', sortable: true},
                {key: 'reason', label: 'Reason', sortable: true},
                {key: 'reportedAt', label: 'Report date', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            pagination: {
                current: 1,
                limit: 10,
                pages: null
            }
        }
    },
    mounted() {
    },
    computed: {
        ...mapState('filter', ['filter']),
    },
    methods: {
        search() {
            this.getItems();
        },
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            const params = {
                start: this.filter.start,
                end: this.filter.end,
                limit: this.pagination.limit,
                page: this.pagination.current
            };

            const {data} = await CommentService.get(params);

            if (data.items.length) {
                this.items = this.makeItems(data.items);
            }

            this.$root.$emit('gcLoading', 0);
        },
        makeItems(data) {
            return data.map(el => {
                return {
                    id: el.id,
                    reporter: el.report[0].reporter.username,
                    reason: el.report[0].reason,
                    reportedAt: el.report[0].reportedAt
                }
            });
        }
    }
}
</script>
<style scoped>
</style>
