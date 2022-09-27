<template>
    <div class="row">
        <div class="col-4">
            <div class="d-flex justify-content-start">
                <button class="btn btn-sm btn-primary" @click="addParent">
                    <b-icon-plus/>
                </button>
                <multiselect :multiple="false"
                             :searchable="true"
                             v-model="parent"
                             label="label"
                             placeholder="Select an agency"
                             required
                             :options="agencies"></multiselect>
            </div>
        </div>
        <div class="col-4" v-if="enableClassification">
            <multiselect :multiple="false"
                         :searchable="true"
                         v-model="classification"
                         label="label"
                         placeholder="Select a classification"
                         required
                         :options="classifications"></multiselect>
        </div>
        <div class="col-4">
            <div class="input-group">
                <input type="text" class="form-control" v-model.trim="children"
                       placeholder="Influencer email"/>
                <button class="btn btn-sm btn-primary" @click="add">
                    <b-icon-person-plus-fill/>
                </button>
            </div>
        </div>

        <!-- Modal add parent -->
        <parent-influencer-modal :open="modal"
                                 @parent="onAddParent"
                                 @close="close"/>
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import ParentInfluencerModal from "../../components/Influencer/ParentModal";

export default {
    name: 'AddInfluencerInCampaign',
    components: {ParentInfluencerModal, Multiselect},
    props: {
        agencies: {
            Type: Array,
            default: () => []
        },
        enableClassification: {
            Type: Boolean,
            default: false
        }
    },
    data() {
        return {
            parent: null,
            children: null,
            modal: false,
            classification: null,
            classifications: [
                {value: 'a', label: 'A'},
                {value: 'b', label: 'B'},
                {value: 'c', label: 'C'},
                {value: 's', label: 'S'},
                {value: 'ss', label: 'SS'},
                {value: 'sss', label: 'SSS'},
            ]
        }
    },
    methods: {
        async add() {
            if (!this.parent || !this.children) {
                this.$toast.error('Parent and children is required');
                return;
            }

            const params = {
                children: this.children,
                parent: this.parent.value
            };

            if (this.enableClassification && !this.classification) {
                this.$toast.error('Classification is required');
            }

            params.classification = this.classification.value;

            this.$emit('add', params);
        },
        addParent() {
            this.modal = true;
        },
        async onAddParent(e) {
            const exists = this.agencies.filter(el => el.value === e);

            if (exists.length) {
                this.$toast.error('Email already exists');
                return;
            }

            const newParent = {
                label: e,
                value: e
            };

            this.agencies.push(newParent);
            this.parent = newParent;
        },
        close() {
            this.modal = false;
        }
    }
}
</script>
<style scoped>
</style>
