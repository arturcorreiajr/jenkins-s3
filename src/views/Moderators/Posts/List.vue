<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <h2><b>P</b>osts</h2>
            <h3>Manage reported posts</h3>
        </div>

        <filter-date @search="search"></filter-date>

        <div class="row mt-3" v-if="items.length">
            <div class="col-2 mb-3" v-for="(item, index) in items" :key="index">
                <div class="form-post d-flex align-items-center justify-content-center">
                    <a class="text-decoration-none cursor-pointer"
                       @click="$router.push({name: 'moderators-posts-edit', params: { id: item.id } })">
                        <img class="w-100" :src="mediaCover(item)" alt="Reported Posts - GotChosen">
                        <div class="info">
                            <p class="m-0"><b>Informant</b> @{{ reporterUsername(item) }}</p>
                            <p class="m-0"><b>Author</b> @{{ item.author.username }}</p>
                            <p class="m-0"><b>Reason</b> {{ reason(item) }}</p>
                            <p class="m-0"><b>Reported at</b> {{ reportedAt(item) }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <pagination v-show="items.length"
                    :current="this.pagination.current"
                    :pages="this.pagination.pages"
                    :limit="this.pagination.limit"
                    @search="searchByPage">
        </pagination>
    </div>
</template>
<script>
import FilterDate from "../../../components/Moderator/FilterDate";
import PostService from "../../../services/Moderator/PostService";
import Pagination from "../../../components/Shared/Pagination";
import {mapState} from "vuex";

export default {
    name: 'ReportedPosts',
    components: {FilterDate, Pagination},
    data() {
        return {
            items: [],
            pagination: {
                current: 1,
                limit: 18,
                pages: null
            }
        }
    },
    mounted() {
    },
    computed: {
        ...mapState('filter', ['filter']),
        mediaPath() {
            return `${process.env.VUE_APP_CLOUD_FRONT_URL}/post/media`
        }
    },
    methods: {
        search() {
            this.getItems();
        },
        searchByPage(page) {
            this.pagination.current = page;
            this.search();
        },
        async getItems() {
            this.$root.$emit('gcLoading', 1);

            const params = {
                start: this.filter.start,
                end: this.filter.end,
                limit: this.pagination.limit,
                page: this.pagination.current
            };

            const {data} = await PostService.get(params);

            if (data.items.length) {
                this.items = data.items;
                this.setTotalPages(data.totalCount);
            }

            this.$root.$emit('gcLoading', 0);
        },
        setTotalPages(countItems) {
            this.pagination.pages = Math.ceil(countItems / this.pagination.limit);
        },
        mediaCover(post) {
            let cover = null;

            post.media.forEach((el) => {
                if (el.mediaType === 'cover' || el.mediaType === 'preview') {
                    cover = el.original;
                }
            });

            if (!cover) {
                cover = post.media[0].mediaCover || post.media[0].mediaPreview;
            }

            return `${this.mediaPath}/${cover}`;
        },
        reporterUsername(post) {
            return `${post.reporter[0].username}${post.reporter.length > 1 ? '...' : ''}`
        },
        reason(post) {
            return `${post.reporter[0].reason}${post.reporter.length > 1 ? '...' : ''}`
        },
        reportedAt(post) {
            return `${post.reporter[0].reportedAt}${post.reporter.length > 1 ? '...' : ''}`
        },
    }
}
</script>
<style scoped>
.form-post {
    height: 310px;
    border: solid 1px #ddd;
    overflow: hidden;
    position: relative;
}

.form-post .info {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
}
</style>
