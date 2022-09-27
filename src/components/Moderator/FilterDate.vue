<template>
    <div class="row">
        <div class="col-2">
            <small class="text-muted">Start Date</small>
            <input type="date" class="form-control" placeholder="Start Date" v-model="start">
        </div>
        <div class="col-2">
            <small class="text-muted">End Date</small>
            <input type="date" class="form-control" placeholder="End Date" v-model="end">
        </div>
        <div class="col-2" v-if="enableAmbassador">
            <small class="text-muted">Ambassador</small>
            <input type="text" class="form-control" placeholder="Ambassador email" v-model.trim="ambassador">
        </div>
        <div class="col-2" v-if="enableParent">
            <small class="text-muted">Parent</small>
            <input type="text" class="form-control" placeholder="Parent email" v-model.trim="parent">
        </div>
        <div class="col-2" v-if="enableEmail">
            <small class="text-muted">Email</small>
            <input type="text" class="form-control" placeholder="Email" v-model.trim="email">
        </div>
        <div class="col-2">
            <button class="btn btn-primary btn-sm mt-4" @click="search">
                <b-icon-search></b-icon-search>
                Search
            </button>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: 'FilterDate',
    props: {
        enableAmbassador: {
            type: Boolean,
            default: false,
        },
        enableParent: {
            type: Boolean,
            default: false,
        },
        enableEmail: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            start: null,
            end: null,
            ambassador: null,
            parent: null,
            email: null
        }
    },
    mounted() {
        this.start = this.filter.start || null;
        this.end = this.filter.end || null;

        if (this.start && this.end) {
            this.search();
        }
    },
    computed: {
        ...mapState('filter', ['filter'])
    },
    methods: {
        ...mapMutations('filter', ['setFilter']),
        search() {
            if (!this.start) {
                this.$toast.error('Start date is required.')
                return;
            }

            if (!this.end) {
                this.$toast.error('End date is required.')
                return;
            }

            this.setFilter({
                start: this.start,
                end: this.end,
                ambassador: this.ambassador,
                parent: this.parent,
                email: this.email,
            });

            this.$emit('search');
        },
    }
}
</script>
<style scoped>

</style>
