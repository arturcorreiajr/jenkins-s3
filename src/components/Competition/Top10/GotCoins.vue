<template>
    <div>
        <gc-table
            :items="items"
            :fields="fields"
            :limit="10">
            <template v-slot:custom1="data">
                <div class="d-flex justify-content-start">
                    <div class="me-3" style="width: 30px;">
                        <img :src="require(`@/assets/top10/${data.row.position}.png`)"
                             class="position-upper"
                             v-if="[1,2,3,4,5,6,7,8,9,10].includes(data.row.position)"
                             :alt="data.row.position">
                        <span class="position-lower" v-else>{{ data.row.position }}</span>
                    </div>
                    <a :href="getUserUrl(data.row.user.username)" target="_blank">
                        <img class="img-user" :src="data.row.user.avatarUrl || require('@/assets/no-profile.jpeg')" alt="Avatar user - GotChosen"
                             @error="$event.target.src=require('@/assets/no-profile.jpeg')">
                    </a>
                </div>
            </template>
            <template v-slot:custom2="data">
                <p class="got-coin">
                    <img :src="require(`@/assets/gotcoin.png`)" alt="GotCoin - GotChosen">
                    {{ data.row.value.toLocaleString('en-US') }}
                </p>
            </template>
            <template v-slot:actions="data">
                <button class="btn btn-sm btn-danger me-2"
                        v-b-tooltip.hover="`Disqualify to this month`"
                        @click="openModalDisqualify(data.row)">
                    <b-icon-x-circle-fill/>
                    Disqualify
                </button>

                <button class="btn btn-sm btn-dark"
                        v-b-tooltip.hover="`Add user in blacklist`"
                        @click="openModalBlacklist(data.row, 'blacklist')">
                    <b-icon-x-circle-fill/>
                    Blacklist
                </button>
            </template>
        </gc-table>

        <!-- Modal disqualify -->
        <top10-modal-disqualify :open="modalDisqualify"
                                @close="closeModalActions"
                                @disqualified="onDisqualifiedUser"
                                :theme="theme"
                                :item="selected"></top10-modal-disqualify>

        <!-- Modal blacklist -->
        <top10-modal-blacklist :open="modalBlacklist"
                               @close="closeModalActions"
                               @addedInBlacklist="onAddedUserInBlacklist"
                               :theme="theme"
                               :item="selected"></top10-modal-blacklist>
    </div>
</template>
<script>
import Top10Service from "../../../services/Competition/Top10Service";
import GcTable from "../../../components/Shared/GcTable";
import Top10ModalDisqualify from "../../../components/Competition/Top10/ModalDisqualify";
import Top10ModalBlacklist from "../../../components/Competition/Top10/ModalBlacklist";

export default {
    name: 'Top10GotCoins',
    components: {Top10ModalBlacklist, Top10ModalDisqualify, GcTable},
    props: {
        reference: {
            type: String,
            default: null
        },
        region: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            items: [],
            fields: [
                {key: 'custom1', label: '', sortable: false},
                {key: 'user.id', label: 'Id', sortable: true},
                {key: 'user.username', label: 'Username', sortable: true},
                {key: 'custom2', label: 'GotCoins', sortable: true},
                {key: 'actions', label: 'Actions', sortable: false},
            ],
            selected: {},
            modalDisqualify: false,
            modalBlacklist: false,
            theme: 'gotcoins'
        }
    },
    mounted() {
        this.getItems();
    },
    computed: {},
    methods: {
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            try {
                const params = {
                    country: this.region
                };

                const {data} = await Top10Service.getTop10Ranking(this.reference, params, this.theme);

                if (data.results.length) {
                    this.items = data.results;
                }
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        getUserUrl(username) {
            return `${process.env.VUE_APP_GOT_CHOSEN_URL}/@${username}`;
        },
        openModalDisqualify(item) {
            this.modalBlacklist = false;
            this.modalDisqualify = true;
            this.selected = item;
        },
        openModalBlacklist(item) {
            this.modalDisqualify = false;
            this.modalBlacklist = true;
            this.selected = item;
        },
        closeModalActions() {
            this.modalDisqualify = false;
            this.modalBlacklist = false;
        },
        onDisqualifiedUser() {
            this.getItemsGotCoins();
        },
        onAddedUserInBlacklist() {
            this.getItemsGotCoins();
        }
    }
}
</script>
<style scoped>
.img-user {
    width: 35px;
    height: 35px;
    overflow: hidden;
    border-radius: 50%;
}

.position-upper {
    width: 33px;
    margin-top: 2px;
}

.position-lower {
    background: var(--background-default);
    padding: 5px;
    border-radius: 50%;
    position: relative;
    top: 3px;
    left: 3px;
    font-size: 14px;
    font-weight: bold;
    color: white;
}
</style>
