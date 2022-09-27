<template>
    <div>
        <div class="container-fluid d-content">
            <div class="title-content mb-3">
                <h2><b>P</b>romoters</h2>
                <h3>Edit campaign <b class="text-primary">{{ item.name }}</b>, the current campaign is <span
                    class="badge bg-primary">{{ item.status }}</span> and type
                    <span class="badge bg-primary">{{ item.type }}</span></h3>
                <a class="mt-2 cursor-pointer" @click="$router.push({name: 'promoters'})">Back</a>
            </div>

            <!-- Form add promoter -->
            <add-influencer-in-campaign :agencies="agencies" @add="addChildren" :enable-classification="true"/>

            <!-- Influencers list -->
            <div class="row mt-3" v-if="influencers.length">
                <div class="col-12">
                    <influencer-table
                        class="mt-3"
                        :items="influencers"
                        :fields="fields"
                        :limit="10"
                    >
                        <template v-slot:custom1="data">
                            <b-form-group>
                                <input class="form-check-input"
                                       type="checkbox"
                                       v-model="selected"
                                       :value="data.row"
                                       @change="selectParent(data.row, $event)"
                                />
                            </b-form-group>
                        </template>
                        <template v-slot:custom2="data">
                            {{ data.row.email }}
                            <span class="badge bg-primary cursor-pointer"
                                  v-show="!data.row.parent"
                                  v-b-tooltip.hover
                                  :title="data.row.parent_email">Parent</span>
                        </template>
                    </influencer-table>
                    <button class="btn btn-danger btn-sm btn-del" @click="removeInfluencers"
                            :disabled="selected.length === 0">
                        <b-icon-trash2-fill/>
                    </button>
                </div>
            </div>

            <!-- Modal remove influencer -->
            <remove-influencer-modal :open="modal.remove"
                                     :items="selected"
                                     :campaign="item"
                                     :context="'Promoters'"
                                     @removed="onRemovedInfluencers"
                                     @close="closeModal"/>
        </div>
    </div>
</template>
<script>
import PromoterService from "../../../services/Influencers/PromoterService";
import InfluencerTable from "../../../components/Influencer/InfluencerTable";
import RemoveInfluencerModal from "../../../components/Influencer/RemoveInfluencerModal";
import AddInfluencerInCampaign from "../../../components/Influencer/AddInCampaign";
import Shared from "../../../mixins/Influencers/Shared";

export default {
    name: 'EditPromoters',
    components: {AddInfluencerInCampaign, InfluencerTable, RemoveInfluencerModal},
    mixins: [Shared],
    data() {
        return {
            id: null,
            item: {
                ambassadors: []
            },
            influencers: [],
            agencies: [],
            modal: {
                parent: false,
                remove: false,
            },
            fields: [
                {key: 'custom1', label: '', sortable: false},
                {key: 'custom2', label: 'Email', sortable: false},
            ],
            selected: []
        };
    },
    mounted() {
        this.id = this.$route.params.id;

        this.getItem();
        this.getAgencies();
    },
    methods: {
        async getItem() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await PromoterService.get(this.id)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.id) {
                this.item = data;
                this.influencers = this.makeInfluencers(this.item.ambassadors);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async getAgencies() {
            this.$root.$emit('gcLoading', 1);

            const {data} = await PromoterService.agencies(this.id)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            if (data.length) {
                this.agencies = data.map(el => {
                    return {
                        label: el.email,
                        value: el.email
                    };
                });
            }

            this.$root.$emit('gcLoading', 0);
        },
        async addChildren(e) {
            this.$root.$emit('gcLoading', 1);

            const params = {
                campaign: this.item.id,
                ambassador: e.children,
                parent: e.parent,
                classification: e.classification
            };

            const res = await PromoterService.addInfluencer(params)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);

                    if (e.response.data) {
                        this.$toast.error(e.response.data.message);
                        return;
                    }

                    this.$toast.error(e);
                });

            this.$root.$emit('gcLoading', 0);

            if (!res) {
                return;
            }

            this.$toast.success('Ambassador added');

            await this.getItem();
        },
    },
}
</script>
<style scoped>
.btn-del {
    margin-top: -98px;
    margin-left: 1em;
}
</style>
