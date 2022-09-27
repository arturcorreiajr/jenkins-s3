<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>P</b>romoters</h2>
                <h3>Create indian campaign to promoters</h3>
                <a class="mt-2 cursor-pointer" @click="$router.push({name: 'promoters'})">Back</a>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="mb-3">
                        <label class="form-label">Start date</label>
                        <input type="date" class="form-control" placeholder="Start date" v-model="start">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">EndDate date</label>
                        <input type="date" class="form-control" placeholder="EndDate date" v-model="end">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Type</label>
                        <multiselect :multiple="false"
                                     :searchable="true"
                                     v-model="type"
                                     label="label"
                                     placeholder="Select a type"
                                     required
                                     :options="types"></multiselect>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" v-model="replicate" id="replicate"
                               v-b-toggle.box-replicate>
                        <label class="form-check-label" for="replicate">
                            Replicate from another campaign
                        </label>
                    </div>

                    <div class="mb-3">
                        <b-collapse class="box-multiple-options" id="box-replicate">
                            <div class="mb-3">
                                <multiselect :multiple="false"
                                             :searchable="true"
                                             v-model="campaign"
                                             label="label"
                                             placeholder="Select a campaign"
                                             required
                                             :options="campaigns"></multiselect>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="ignoreZed" id="ignoreZed">
                                <label class="form-check-label" for="ignoreZed">
                                    Ignore children or parents with 0 posts
                                </label>
                            </div>
                        </b-collapse>
                    </div>

                    <div>
                        <button class="btn btn-sm btn-primary" @click="create">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import PromoterService from "../../../services/Influencers/PromoterService";

export default {
    name: 'CreatePromoters',
    components: {Multiselect},
    data() {
        return {
            start: null,
            end: null,
            replicate: null,
            campaign: null,
            type: null,
            ignoreZed: null,
            campaigns: [],
            types: [
                {label: 'CPM', value: 'cpm'},
                {label: 'Cache', value: 'cache'},
            ]
        };
    },
    mounted() {
        this.getCampaigns();
    },
    methods: {
        async getCampaigns() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await PromoterService.get()
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.length) {
                this.campaigns = data.map(el => {
                    return {value: el.id, label: `${el.name} - ${el.type}`};
                });
            }

            this.$root.$emit('gcLoading', 0);
        },
        create() {
            if (this.validate()) {
                return;
            }

            this.$root.$emit('gcLoading', 1);

            const params = {
                start: this.start,
                end: this.end,
                replicate: this.replicate,
                campaign: this.campaign ? this.campaign.value : null,
                type: this.type.value,
                ignoreZeroed: this.ignoreZed
            };

            PromoterService.create(params)
                .then(res => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.success('Campaign created successfully');
                    this.$router.push({name: 'promoters'});
                    return res;
                })
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);

                    if (e.response && e.response.data && e.response.data.message) {
                        this.$toast.error(e.response.data.message);
                        return;
                    }

                    this.$toast.error(e);
                });
        },
        validate() {
            if (!this.start) {
                this.$toast.error('Start date is required.');
                return true;
            }

            if (!this.end) {
                this.$toast.error('End date is required.');
                return true;
            }

            if (!this.type) {
                this.$toast.error('Type is required.');
                return true;
            }

            return false;
        }
    },
}
</script>
<style scoped>
</style>
