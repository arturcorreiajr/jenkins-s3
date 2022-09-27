<template>
    <div>
        <modal :title="`Hashtags`" @close="close" :open="open">
            <template v-slot:content>
                <!-- Create/edit Hashtag -->
                <div class="mb-3" v-if="!listing">
                    <hashtag :item="itemToEdit" @create="onCreatedHashtag"
                             @edit="onEditedHashtag"
                             :key="JSON.stringify(itemToEdit)"></hashtag>
                    <button class="btn btn-info btn-sm float-start btn-cancel" @click="cancelStore">Cancel</button>
                </div>

                <!-- Filter hashtag and list hashtags -->
                <div v-else>
                    <!-- Filter hashtag -->
                    <div class="row mt-1 mb-3">
                        <div class="col-2">
                            <button class="btn btn-sm btn-primary" @click="create">
                                Create
                            </button>
                        </div>
                        <div class="col-8">
                            <input type="text"
                                   class="form-control"
                                   @keyup.enter="search"
                                   v-model="filter.hashtag"
                                   placeholder="Hashtag name" />
                        </div>
                        <div class="col-2">
                            <button class="btn btn-sm btn-primary" @click="search">
                                Search
                            </button>
                        </div>
                    </div>

                    <hr>

                    <!-- List hashtags -->
                    <div class="hashtag-table" v-if="listing" v-show="items.length">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <th scope="row">{{ item.id }}</th>
                                <td>{{ item.hashtag }}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary" title="Select this hashtag"
                                            @click="select(item)">
                                        <b-icon-hand-index/>
                                    </button>
                                    <button class="btn btn-sm btn-info ms-2" title="Edit this hashtag" @click="edit(item)">
                                        <b-icon-pencil-fill/>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template v-slot:footer>&nbsp;</template>
        </modal>
    </div>
</template>
<script>
import Modal from "../../Shared/Modal/Modal";
import HashtagService from "../../../services/Competition/HashtagService";
import Hashtag from "./Hashtag";

export default {
    name: 'HashtagModal',
    components: {Modal, Hashtag},
    props: {
        open: {
            Type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            items: [],
            filter: {
                hashtag: null,
                limit: 50,
                page: 1
            },
            itemToEdit: {
                name: null,
                cover: null,
                description: null
            },
            listing: true,
        }
    },
    mounted() {
    },
    methods: {
        async search() {
            this.items = [];

            this.$root.$emit('gcLoading', 1);

            const params = {
                limit: this.filter.limit,
                page: this.filter.page
            };

            if (this.filter.hashtag) {
                params.term = this.filter.hashtag
            }

            const {data} = await HashtagService.get(params);

            if (data.items.length) {
                this.items = data.items;
            }

            this.$root.$emit('gcLoading', 0);
        },
        select(hashtag) {
            const item = {
                id: hashtag.id,
                name: hashtag.hashtag,
                cover: hashtag.coverUrl || null
            }

            this.$emit('hashtag', item);
            this.close();
        },
        close() {
            this.listing = true;
            this.$emit('close', false);
        },
        edit(item) {
            this.listing = false;
            this.itemToEdit = {
                id: item.id,
                name: item.hashtag,
                cover: item.coverUrl,
                description: item.description
            }
        },
        create() {
            this.listing = false;
            this.itemToEdit = {};
        },
        cancelStore() {
            this.listing = true;
        },
        onCreatedHashtag(e) {
            this.$emit('hashtag', e);
            this.close();
        },
        onEditedHashtag(e) {
            this.$emit('hashtag', e);
            this.close();
        }
    },
    watch: {
        open(val) {
            if (val) {
                this.search();
            }
        }
    }
}
</script>
<style scoped>
.hashtag-table {
    max-height: 400px;
    overflow: auto;
}

.btn-cancel {
    margin-top: -41px;
}
</style>
