<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <div class="d-flex justify-content-between">
                <div>
                    <h2><b>H</b>ashtag <b>C</b>ontest</h2>
                    <h3>Manage contest id {{ id }}</h3>
                    <a class="mt-2 cursor-pointer" @click="$router.push({name: 'competition-hashtag-contest'})">Back</a>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Form contest -->
            <div class="col-6">
                <div class="item-section p-3">
                    <contest :contest="item" :key="JSON.stringify(item)"></contest>
                </div>
            </div>

            <!-- Other data -->
            <div class="col-6">
                <div class="item-section p-3">
                    <div class="row mt-3">
                        <label class="col-sm-2 col-form-label">Status</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="item.status" :disabled="true"/>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <label class="col-sm-2 col-form-label">Total posts</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="totalPosts" :disabled="true"/>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <label class="col-sm-2 col-form-label">Total views</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="item.views" :disabled="true"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Posts -->
        <div class="row mt-3" v-if="posts && posts.length">
            <div class="col-12">
                <div class="item-section p-3">
                    <div class="d-flex justify-content-between mb-3">
                        <h5>Posts</h5>

                        <div>
                            <button class="btn btn-sm btn-primary ms-3"
                                    v-show="item.status === 'finishedWithNoWinners' && winners.length"
                                    @click="sendWinners">
                                Send Winners
                            </button>

                            <button class="btn btn-sm btn-primary ms-3"
                                    :disabled="item.status !== 'finishedWithNoWinners'"
                                    @click="validateWinners">
                                Validate winners
                            </button>
                        </div>
                    </div>

                    <!-- Posts to validate-->
                    <div class="row">
                        <!-- Winners posts -->
                        <div class="col-2" v-for="(post) in item.winners" :key="post.post.id">
                            <post @open="openPostActionModal" :item="post"></post>
                        </div>

                        <!-- Posts in contest -->
                        <div class="col-2"
                             :class="isSelectedWinner(post.post.id) ? getClassWinnerPosition(post.post.id) : ''"
                             v-for="post in posts"
                             :key="post.post.id">
                            <post @open="openPostActionModal" :item="post"></post>
                        </div>

                        <!-- Show more posts -->
                        <div class="col-2" v-show="showMorePosts">
                            <div @click="getItem(showMorePostsPage)"
                                 class="show-more-posts d-flex justify-content-center align-items-center cursor-pointer">
                                <b>Show more posts</b>
                                <b-icon-caret-down-fill/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <post-action-modal :open="openModal"
                           :item="itemToEdit"
                           @close="closePostActionModal"
                           @disqualified="onDisqualifiedPost"
                           @restored="onRestoredPost"></post-action-modal>
    </div>
</template>
<script>
import ContestService from "../../../services/Competition/ContestService";
import Contest from "../../../components/Competition/Contest/Contest";
import moment from "moment";
import RegionMixin from "../../../mixins/Region";
import Post from "../../../components/Competition/Contest/Post";
import PostActionModal from "../../../components/Competition/Contest/PostActionModal";

export default {
    name: 'ContestEdit',
    components: {Contest, Post, PostActionModal},
    mixins: [RegionMixin],
    data() {
        return {
            id: null,
            item: {},
            openModal: false,
            itemToEdit: {},
            winners: [],
            showMorePostsPage: 2,
            showMorePosts: true,
            posts: []
        }
    },
    mounted() {
        this.id = this.$route.params.id;

        if (!this.id) {
            this.$router.push({name: 'competition-hashtag-contest'});
        }

        this.getItem();
    },
    computed: {
        totalPosts() {
            return 9999;
        },
    },
    methods: {
        async getItem(page = 1) {
            this.$root.$emit('gcLoading', 1);

            const params = {
                limit: page === 1 ? 14 : 18,
                page,
            };

            if (page === 1) {
                this.showMorePosts = 1;
                this.showMorePostsPage = 2;
                this.posts = [];
            } else {
                this.showMorePostsPage++;
            }

            const {data} = await ContestService.find(this.id, params)

            if (data.id) {
                this.item = this.makeItem(data);

                if (data.posts.length) {
                    this.posts = this.posts.concat(data.posts);
                } else {
                    this.showMorePosts = false;
                }
            }

            this.$root.$emit('gcLoading', 0);
        },
        makeItem(data) {
            return {
                id: data.id,
                region: this.makeRegion(data),
                hashtag: {
                    id: data.hashtag.id,
                    name: data.hashtag.hashtag,
                    cover: data.hashtag.coverUrl
                },
                start: moment(data.startDate).add(moment.duration(3, 'hours')).format('YYYY-MM-DD hh:mm'),
                end: moment(data.endDate).add(moment.duration(3, 'hours')).format('YYYY-MM-DD hh:mm'),
                description: data.description,
                status: data.statusFilters,
                winners: data.winners || [],
                views: data.views
            }
        },
        openPostActionModal(e) {
            this.openModal = true;
            this.itemToEdit = e;
            this.itemToEdit.contest = this.item.id;
        },
        closePostActionModal() {
            this.openModal = false;
            this.itemToEdit = {};
        },
        async onDisqualifiedPost() {
            await this.getItem();
        },
        async onRestoredPost() {
            await this.getItem();
        },
        async validateWinners() {
            this.$root.$emit('gcLoading', 1);

            try {
                await ContestService.validateWinners(this.item.id);
                await this.getItem();
                this.$toast.success('Contest validated successfully');
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        selectWinner(post) {
            if (this.item.status !== 'finishedWithNoWinners') {
                this.$toast.error('Cannot be chosen in this contest.');
                return;
            }

            if (this.winners.length >= 3) {
                this.$toast.error('There are already 3 winners selected.');
                return;
            }

            const position = this.winners.length + 1;

            this.winners.push({
                post: post.id,
                author: post.author.id,
                position: position
            });
        },
        isSelectedWinner(post) {
            const winner = this.winners.filter(el => el.post === post);
            return !!winner.length;
        },
        getClassWinnerPosition(post) {
            const winner = this.winners.filter(el => el.post === post);
            const position = winner[0].position || 4;

            const classes = {
                1: 'king',
                2: 'prince',
                3: 'joker',
                4: ''
            };

            return classes[position];
        },
        sendWinners() {
            if (this.winners.length < 1) {
                this.$toast.error('The winners are required.');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                this.$toast.success('The winners were successful.');
                this.$root.$emit('gcLoading', 0);
                this.getItem();
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
                this.$root.$emit('gcLoading', 0);
            }
        }
    }
}
</script>
<style scoped>
.show-more-posts {
    border: solid 1px var(--color-primary);
    width: 100%;
    height: 300px;
    color: var(--color-primary);
    transition: all .3s;
}

.show-more-posts:hover {
    transition: all .3s;
    border-color: #5d5d5d;
    color: #5d5d5d;
}

.king, .prince, .joker {
    position: relative;
}

.king::after, .prince::after, .joker::after {
    content: "";
    width: 58px;
    height: 90px;
    background-repeat: no-repeat;
    position: absolute;
    top: 1px;
    right: calc(50% - 30px);
}

.king::after {
    background-image: url('~@/assets/contest/first.png');
}

.prince::after {
    background-image: url('~@/assets/contest/second.png');
}

.joker::after {
    background-image: url('~@/assets/contest/third.png');
}
</style>
