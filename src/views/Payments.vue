<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>P</b>ayments</h2>
                <h3>Manage all pendent payments</h3>
            </div>

            <gc-table
                class="mt-3"
                :items="items"
                :fields="fields"
                :limit="10"
            >
                <template v-slot:custom1="data">
                    {{ paySchedule(data.row.payDay) }}
                </template>
                <template v-slot:actions="data">
                    <button class="btn btn-sm" :disabled="enablePayment(data.row)" :class="enablePayment(data.row) ? 'btn-secondary' : 'btn-success'">
                        <b-icon-currency-dollar></b-icon-currency-dollar>
                        Pay
                    </button>
                </template>
            </gc-table>
        </div>
    </div>
</template>
<script>
import GcTable from "../components/Shared/GcTable";
import PaymentService from "../services/PaymentService";
import moment from "moment";

export default {
    name: 'Payments',
    components: {GcTable},
    data() {
        return {
            name: null,
            items: [],
            fields: [
                {key: 'reference', label: 'Reference', sortable: true},
                {key: 'custom1', label: 'Pay Schedule', sortable: true},
                {key: 'amount', label: 'Amount', sortable: true},
                {key: 'balance', label: 'Balance', sortable: true},
                {key: 'pending', label: 'Pending', sortable: true},
                {key: 'paid', label: 'Paid', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            limit: 10,
            user: {}
        };
    },
    mounted() {
        this.getItems();
    },
    methods: {
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await PaymentService.get();

            if (data.length) {
                this.items = data;
            }

            this.$root.$emit('gcLoading', 0);
        },
        paySchedule(val) {
            if (val === null) {
                return null;
            }

            return moment(val).format('MM/DD/YYYY');
        },
        enablePayment(item) {
            return !(item.balance && item.payDay);
        }
    },
}
</script>
<style scoped>
</style>
