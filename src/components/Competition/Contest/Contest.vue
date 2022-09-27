<template>
    <div>
        <h4>Contest</h4>
        <div class="row mt-3">
            <label class="col-sm-2 col-form-label">Region</label>
            <div class="col-sm-10">
                <multiselect :multiple="false"
                             :searchable="true"
                             label="label"
                             v-model="item.region"
                             placeholder="Select a region"
                             :disabled="isAbleToEdit"
                             :options="regionsWithoutAll"></multiselect>
            </div>
        </div>

        <div class="row mt-3">
            <label class="col-sm-2 col-form-label">Hashtag</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="item.hashtag.name" disabled>
                <p class="m-0" v-if="hashtagLink"><a :href="hashtagLink" target="_blank">Hashtag link</a></p>
                <img class="img-thumbnail mt-2" :src="item.hashtag.cover" alt="Hashtag cover - GotChosen"
                     v-if="item.hashtag.cover">
            </div>

            <div class="col-sm-1">
                <button class="btn btn-sm btn-primary" type="button" @click="openModalHashtag" :disabled="isAbleToEdit">
                    <b-icon-eye-fill/>
                </button>
            </div>
        </div>

        <div class="row mt-3">
            <label class="col-sm-2 col-form-label">Start Date</label>
            <div class="col-sm-10">
                <input type="datetime-local" class="form-control" v-model="item.start" :disabled="isAbleToEditDate"/>
            </div>
        </div>

        <div class="row mt-3">
            <label class="col-sm-2 col-form-label">End Date</label>
            <div class="col-sm-10">
                <input type="datetime-local" class="form-control" v-model="item.end" :disabled="isAbleToEditDate"/>
            </div>
        </div>

        <div class="row mt-3">
            <label class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
                <textarea class="form-control"
                          v-model="item.description"
                          :disabled="isAbleToEdit"
                          placeholder="Description here"></textarea>
            </div>
        </div>

        <div class="mt-3 text-end">
            <button type="button"
                    class="btn btn-primary btn-sm"
                    @click="edit"
                    v-if="item.id"
                    :disabled="isAbleToEdit">
                Edit
            </button>
            <button type="button" class="btn btn-primary btn-sm" @click="create" v-else>
                Create
            </button>
        </div>

        <hashtag-modal :open="modalHashtag"
                       @close="closeModalHashtag"
                       @hashtag="selectedModalHashtag"></hashtag-modal>
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import ContestService from "../../../services/Competition/ContestService";
import RegionMixin from "../../../mixins/Region";
import HashtagModal from "./HashtagModal";

export default {
    name: 'Contest',
    components: {HashtagModal, Multiselect},
    mixins: [RegionMixin],
    props: {
        contest: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            item: {
                id: null,
                region: null,
                hashtag: {
                    name: null,
                    id: null,
                },
                start: null,
                end: null,
                description: null,
            },
            modalHashtag: false,
        }
    },
    mounted() {
        if (this.contest.id) {
            this.item = this.makeItem(this.contest);
        }
    },
    computed: {
        isAbleToEdit() {
            if (this.item.id) {
                return !this.item.status.includes(['toStart']);
            }

            return false;
        },
        isAbleToEditDate() {
            if (this.item.id) {
                return !this.item.status.includes(['toStart']);
            }

            return false;
        },
        hashtagLink() {
            if (this.item.hashtag.id) {
                return `${process.env.VUE_APP_GOT_CHOSEN_URL}/hashtag/${this.item.hashtag.name}`;
            }

            return null;
        }
    },
    methods: {
        makeItem(item) {
            /* eslint-disable-next-line */
            const contest = structuredClone(item);

            const startDate = String(contest.start).split(' ');
            contest.start = `${startDate[0]}T${startDate[1]}`;

            const endDate = String(contest.end).split(' ');
            contest.end = `${endDate[0]}T${endDate[1]}`;

            return contest;
        },
        closeModalHashtag() {
            this.modalHashtag = false;
        },
        openModalHashtag() {
            this.modalHashtag = true;
        },
        selectedModalHashtag(e) {
            this.item.hashtag = e;
        },
        async create() {
            if (!this.validate()) {
                return false;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const item = {
                    startDate: `${this.item.start}:00+00:00`,
                    endDate: `${this.item.end}:00+00:00`,
                    hashtag: this.item.hashtag.id,
                    description: this.item.description,
                };

                if (this.item.region.value === 'IN') {
                    item.country = this.item.region.value;
                }

                await ContestService.create(item);

                this.$toast.success('Contest created successfully');
                await this.$router.push({name: 'competition-hashtag-contest'});
            } catch (e) {
                this.$toast.error(e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async edit() {
            if (!this.validate()) {
                return false;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const item = {
                    startDate: `${this.item.start}:00+00:00`,
                    endDate: `${this.item.end}:00+00:00`,
                    hashtag: this.item.hashtag.id,
                    description: this.item.description,
                };

                if (this.item.region.value === 'IN') {
                    item.country = this.item.region.value;
                }

                await ContestService.update(this.item.id, item);
                this.$root.$emit('gcLoading', 0);
                this.$toast.success('Contest updated successfully');
                await this.$router.push({name: 'competition-hashtag-contest'});
            } catch (e) {
                this.$toast.error(e);
                this.$root.$emit('gcLoading', 0);
            }
        },
        validate() {
            if (!this.item.hashtag.id) {
                this.$toast.error('Hashtag is required.');
                return false;
            }

            if (!this.item.start) {
                this.$toast.error('Start date is required.');
                return false;
            }

            if (!this.item.start) {
                this.$toast.error('End date is required.');
                return false;
            }

            if (!this.item.description) {
                this.$toast.error('Description is required.');
                return false;
            }

            return true;
        }
    }
};
</script>
<style scoped>
.img-thumbnail {
    max-width: 100px;
}
</style>
