<template>
    <div class="post-item mb-3">
        <a :href="postLink" target="_blank">
            <img class="img-fluid" :src="cover" @error="$event.target.src=require('@/assets/not-found.jpg')"
                 alt="Post cover - GotChosen">

            <div class="description p-2">
                <div class="col-6">
                    <p class="m-0">
                        <b-icon-eye-fill/>
                        {{ item.views }}
                    </p>
                </div>
            </div>

            <div class="position" v-if="item.position">
                <img class="author" :src="item.user.avatarUrl || require('@/assets/no-profile.jpeg')"
                     alt="Post author - Gotchosen">
                <img :src="require(`@/assets/contest/${item.position}.png`)" alt="Contest position - GotChosen">
            </div>

            <div class="validated" v-if="item.position">
                <span class="badge bg-warning" v-if="!item.validated">Pending Validation</span>
                <span class="badge bg-success" v-else>Validated</span>
            </div>

            <div class="disqualified" v-if="item.desqualified">
                <span class="badge bg-danger">Disqualified</span>
            </div>
        </a>

        <div class="actions">
            <b-dropdown class="m-md-2" variant="light" right>
                <template v-slot:button-content>
                    <b-icon-three-dots-vertical/>
                </template>
                <b-dropdown-item @click="$emit('open', { post: item.post.id, action: 'restore' })">
                    Restore
                </b-dropdown-item>
                <b-dropdown-item @click="$emit('open', { post: item.post.id, action: 'disqualify' })">
                    Disqualify
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    name: "Post",
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    mounted() {
        // console.log(this.item);
    },
    computed: {
        basePath() {
            return process.env.VUE_APP_GOT_CHOSEN_URL;
        },
        cover() {
            if (this.item.post) {
                return this.item.post.medias.cover.source;
            }

            return null;
        },
        postLink() {
            if (this.item.post) {
                return `${this.basePath}/@${this.item.post.author.username}/p/${this.item.post.id}`
            }

            return null;
        },
        winners() {
            if (this.item.position === 1) {
                return 'first';
            }

            if (this.item.position === 2) {
                return 'second';
            }

            if (this.item.position === 3) {
                return 'third';
            }

            return '';
        }
    },
    methods: {}
}
</script>
<style scoped>
.post-item {
    background: white;
    border: solid 1px #ddd;
    height: 300px;
    width: 100%;
    overflow: hidden;
    position: relative;
    opacity: .8;
    transition: all .3s;
}

.post-item:hover {
    border: solid 1px var(--color-primary);
    opacity: 1;
    transition: all .3s;
}

.description {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
    width: 100%;
    text-align: left;
}

.description p {
    color: white;
}

.position {
    position: absolute;
    right: 3px;
    top: 3px;
}

.author {
    position: absolute;
    top: 24px;
    right: 2px;
    width: 36px;
    border-radius: 50%;
}

.validated {
    position: absolute;
    top: 3px;
    left: 3px;
}

.actions {
    position: absolute;
    right: 2px;
    top: 2px;
    color: var(--color-primary);
    display: none;
}

.post-item:hover .actions {
    display: block;
}

.dropdown-toggle::after {
    display: none !important;
}
</style>
