<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>P</b>romoters</h2>
                <h3>Promoters Report</h3>
                <a class="mt-2 cursor-pointer" @click="$router.push({name: 'promoters'})">Back</a>
            </div>

            <filter-date :enable-ambassador="true"
                         :enable-parent="true"
                         @search="search"/>

            <gc-table
                class="mt-3"
                :items="items"
                :fields="tableFields"
                :sort-by-field="`id`"
                :limit="10"
                :csv="true"
                v-if="items.length"
            >
                <template v-slot:custom1="data">
                    <span class="text-uppercase">{{ data.row.classification }}</span>
                </template>
                <template v-slot:custom2="data">
                    {{ ads(data.row.roles) }}
                </template>
            </gc-table>
        </div>
    </div>
</template>
<script>
import PromoterService from "../../../services/Influencers/PromoterService";
import FilterDate from "../../../components/Moderator/FilterDate";
import {mapMutations, mapState} from "vuex";
import gcTable from "../../../components/Shared/GcTable";

export default {
    name: 'PromotersReport',
    components: {FilterDate, gcTable},
    data() {
        return {
            items: [],
            fields: [
                {key: 'user_id', label: 'UserId', sortable: true},
                {key: 'ambassador', label: 'Promoter', sortable: true},
                {key: 'parent', label: 'Parent', sortable: true},
                {key: 'video_posts', label: 'Video Posts', sortable: true},
                {key: 'followers', label: 'Followers', sortable: true},
                {key: 'active_registrations', label: 'Active Registrations', sortable: true},
                {key: 'days_with_posts', label: 'Days With Posts', sortable: true},
                {key: 'custom1', label: 'Classification', sortable: true, hiddenOnCpm: true},
                {key: 'custom2', label: 'Ads', sortable: true},
            ],
            limit: 10,
            type: ''
        };
    },
    beforeMount() {
        const start = this.$route.params.start;
        const end = this.$route.params.end;
        this.type = this.$route.params.reportType;

        this.setFilter({
            start,
            end,
        });
    },
    computed: {
        ...mapState('filter', ['filter']),
        tableFields() {
            if (this.type === 'cash') {
                return this.fields;
            }

            return this.fields.filter(el => !el.hiddenOnCpm);
        }
    },
    methods: {
        ...mapMutations('filter', ['setFilter']),
        async search() {
            this.$root.$emit('gcLoading', 1);

            const params = {
                start: this.filter.start,
                end: this.filter.end,
                ambassador: this.filter.ambassador,
                agency: this.filter.parent,
                type: this.type
            };

            const {data} = await PromoterService.report(params)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.length) {
                this.items = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        ads(roles) {
            const json = JSON.parse(roles);
            return json.includes('ROLE_INFLUENCER') ? 'Yes' : 'No';
        }
    },
}
</script>
<style scoped>
</style>
