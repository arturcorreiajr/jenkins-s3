<template>
    <div>
        <modal :title="`Remove influncers from campaign`" @close="close" :open="open">
            <template v-slot:content>
                <div class="text-start">
                    <div class="form-check mt-3" v-for="(item, key) in reasons" :key="key">
                        <input class="form-check-input" type="radio"
                               name="reason"
                               v-model="reason"
                               :value="item.value"
                               :id="item.value"/>
                        <label class="form-check-label" :for="item.value">
                            {{ item.label }}
                        </label>
                    </div>

                    <div class="form-group mt-3" v-show="reason === 'other'">
                        <textarea class="form-control" v-model="other" placeholder="Description to remove"></textarea>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <button class="btn btn-sm btn-danger" @click="remove">
                    Remove
                </button>

                <button class="btn btn-sm btn-secondary" @click="close">
                    Close
                </button>
            </template>
        </modal>
    </div>
</template>
<script>
import Modal from "../Shared/Modal/Modal";
import AmbassadorService from "../../services/Influencers/AmbassadorService";
import PromoterService from "../../services/Influencers/PromoterService";

export default {
    name: 'RemoveInfluencerModal',
    components: {Modal},
    props: {
        open: {
            Type: Boolean,
            default: true,
        },
        campaign: {
            Type: Object,
            default: () => {
            }
        },
        items: {
            Type: Array,
            default: () => {
                return []
            },
        },
        context: {
            Type: String,
            default: ''
        }
    },
    data() {
        return {
            reasons: [
                {label: 'Agency request', value: 'agency-request'},
                {label: 'Influencer request', value: 'ambassador-request'},
                {label: 'Agency Change', value: 'agency-change'},
                {label: 'Breaking Rules', value: 'breaking-rules'},
                {label: 'Other', value: 'other'},
            ],
            reason: 'agency-request',
            other: null,
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', false);
            this.reason = 'agency-request';
            this.other = null;
        },
        async remove() {
            if (!this.reason) {
                this.$toast.error('Reason is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            const params = {
                campaign: this.campaign.id,
                reason: this.reason,
                other: this.reason === 'other' ? this.other : null,
                emails: this.makeEmails(this.items)
            };

            let service = AmbassadorService;

            if (this.context === 'Promoters') {
                service = PromoterService;
            }

            await service.removeInfluencers(params)
                .catch(e => {
                    this.$root.$emit('gcLoading', 0);
                    this.$toast.error(e);
                });

            this.$root.$emit('gcLoading', 0);
            this.close();
            this.$emit('removed');
            this.$toast.success('Influencers removed');
        },
        makeEmails(data) {
            const emails = [];

            data.forEach(el => {
                if (!el.parent) {
                    emails.push({
                        email: el.email,
                        parent: el.parent_email,
                    });
                }
            })

            return emails;
        }
    },
}
</script>
<style scoped>
.form-check-input {
    border-radius: 50% !important;
}
</style>
