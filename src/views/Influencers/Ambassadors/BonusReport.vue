<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>A</b>mbassadors</h2>
                <h3>Bonus Report</h3>
                <a class="mt-2 cursor-pointer" @click="$router.push({name: 'ambassadors'})">Back</a>
            </div>

            <filter-date :enable-email="true" @search="search"/>

            <gc-table
                class="mt-3"
                :items="items"
                :fields="fields"
                :sort-by-field="`total`"
                :limit="10"
                :csv="true"
                v-if="items.length"
            >
                <template v-slot:custom1="data">
                    {{ userTypes[data.row.user_type] }}
                </template>
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
                {key: 'id', label: 'Id', sortable: true},
                {key: 'email', label: 'Email', sortable: true},
                {key: 'custom1', label: 'Type', sortable: true},
                {key: 'activity', label: 'Activity', sortable: true},
                {key: 'registration', label: 'Registrations', sortable: true},
                {key: 'bonus1000', label: '1000+', sortable: true},
                {key: 'extra', label: 'Extra', sortable: true},
                {key: 'total', label: 'Total', sortable: true},
            ],
            limit: 10,
            userTypes: {
                ambassador: 'Ambassador',
                agency: 'Agency',
            }
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
                email: this.filter.email,
            };

            const {data} = await AmbassadorService.bonusReport(params)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.length) {
                this.items = this.makeItems(data);
            }

            this.$root.$emit('gcLoading', 0);
        },
        makeItems(data) {
            return data.map(el => {
                if (el.isAgency) {
                    el._rowVariant = 'success';
                }

                return el;
            })

        }
    },
}
</script>
<style scoped>
</style>
