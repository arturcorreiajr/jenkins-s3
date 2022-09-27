<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b class="text-capitalize">{{ region }}</b> {{ reference }}</h2>
            <h3>Managing top10 ranking</h3>
        </div>

        <p><a class="cursor-pointer" @click="$router.push({name: 'competition-top10'})">Back</a></p>

        <p class="m-0 mb-2 txt-note">
            Note: Disqualification and the option to add to the black list may take up to 15 minutes to update
        </p>

        <div class="d-flex justify-content-start">
            <a class="top10-category border-end-0"
               :class="action === 'gotCoins' ? 'top10-active' : ''"
               @click="action = 'gotCoins'">
                GotCoins Earned
            </a>
            <a class="top10-category border-end-0"
               :class="action === 'viewingTime' ? 'top10-active' : ''"
               @click="action = 'viewingTime'">
                Viewing Time
            </a>
            <a class="top10-category"
               :class="action === 'engagedPosts' ? 'top10-active' : ''"
               @click="action = 'engagedPosts'">
                Posts Engaged
            </a>
        </div>

        <div class="mt-4">
            <top10-got-coins :reference="reference" :region="region"
                             v-if="action === 'gotCoins' && region"></top10-got-coins>
            <top10-viewing-time :reference="reference" :region="region"
                                v-if="action === 'viewingTime' && region"></top10-viewing-time>
            <top10-engaged-posts :reference="reference" :region="region"
                                 v-if="action === 'engagedPosts' && region"></top10-engaged-posts>
        </div>
    </div>
</template>
<script>
import Top10GotCoins from "../../../components/Competition/Top10/GotCoins";
import Top10ViewingTime from "../../../components/Competition/Top10/ViewingTime";
import Top10EngagedPosts from "../../../components/Competition/Top10/EngagedPosts";

export default {
    name: 'ManageTop10',
    components: {Top10EngagedPosts, Top10ViewingTime, Top10GotCoins},
    data() {
        return {
            reference: null,
            region: null,
            action: 'gotCoins',
        }
    },
    mounted() {
        this.reference = this.$route.params.reference;
        this.region = this.$route.params.region;

    },
    computed: {},
    methods: {}
}
</script>
<style scoped>
.top10-category {
    border: solid 1px var(--background-hover-default);
    padding: .50em 3em;
    background: var(--background-default);
    color: white;
    transition: all .3s;
    text-decoration: none;
    cursor: pointer;
}

.top10-category:hover {
    background: var(--background-hover-default);
    transition: all .3s;
}

.top10-active {
    background: white;
    color: var(--background-default);
    transition: all .3s;
}

.top10-active:hover {
    color: white;
    transition: all .3s;
}

.txt-note {
    font-size: 12px;
    color: #aaa;
}
</style>
