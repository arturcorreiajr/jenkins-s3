<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>A</b>mbassadors</h2>
                <h3>Ambassadors Report</h3>
                <a class="mt-2 cursor-pointer" @click="$router.push({name: 'ambassadors'})">Back</a>
            </div>

            <filter-date :enable-ambassador="true"
                         :enable-parent="true"
                         @search="search"/>

            <gc-table
                class="mt-3"
                :items="items"
                :fields="fields"
                :sort-by-field="`id`"
                :limit="10"
                :csv="true"
                v-if="items.length"
            >
            </gc-table>
        </div>
    </div>
</template>
<script>
import AmbassadorService from "../../../services/Influencers/AmbassadorService";
import FilterDate from "../../../components/Moderator/FilterDate";
import {mapMutations, mapState} from "vuex";
import gcTable from "../../../components/Shared/GcTable";

export default {
    name: 'AmbassadorsReport',
    components: {FilterDate, gcTable},
    data() {
        return {
            items: [],
            fields: [
                {key: 'user_id', label: 'UserId', sortable: true},
                {key: 'ambassador', label: 'Ambassador', sortable: true},
                {key: 'parent', label: 'Parent', sortable: true},
                {key: 'video_posts', label: 'Video Posts', sortable: true},
                {key: 'followers', label: 'Followers', sortable: true},
                {key: 'active_registrations', label: 'Active Registrations', sortable: true},
                {key: 'days_with_posts', label: 'Days With Posts', sortable: true},
            ],
            limit: 10,
        };
    },
    beforeMount() {
        const start = this.$route.params.start;
        const end = this.$route.params.end;

        this.setFilter({
            start,
            end
        });
    },
    computed: {
        ...mapState('filter', ['filter']),
    },
    methods: {
        ...mapMutations('filter', ['setFilter']),
        async search() {
            this.$root.$emit('gcLoading', 1);

            const params = {
                start: this.filter.start,
                end: this.filter.end,
                ambassador: this.filter.ambassador,
                agency: this.filter.parent
            };

            const {data} = await AmbassadorService.report(params)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.length) {
                this.items = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
    },
}
</script>
<style scoped>
</style>
