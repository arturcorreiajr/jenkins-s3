<template>
    <div>
        <h4 v-if="item.id"><span class="text-primary">{{ name }}</span></h4>
        <h4 v-else>Hashtag</h4>

        <div class="row mt-3">
            <label class="col-sm-3 col-form-label">Hashtag</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="name"
                       placeholder="Hashtag">
            </div>
        </div>

        <div class="row mt-3">
            <label class="col-sm-3 col-form-label">Description</label>
            <div class="col-sm-9">
                <textarea v-model="description" class="form-control" placeholder="Description"></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <label class="col-sm-3 col-form-label">Cover image</label>
            <div class="col-sm-9">
                <input type="file" class="form-control" @change="previewCover" ref="cover"/>
            </div>
            <div class="cover-hashtag mt-3" v-show="coverUrl">
                <img class="img-thumbnail" :src="coverUrl" alt="Hashtag cover - GotChosen">
            </div>
        </div>

        <div class="mt-3 text-end" v-if="item.id">
            <button type="button" class="btn btn-success btn-sm me-2" @click="edit">
                Edit
            </button>
        </div>

        <div class="mt-3 text-end" v-else>
            <button type="button" class="btn btn-primary btn-sm" @click="create">
                Create
            </button>
        </div>
    </div>
</template>
<script>
import HashtagService from "../../../services/Competition/HashtagService";

export default {
    name: 'Hashtag',
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            id: null,
            name: null,
            cover: null,
            coverUrl: null,
            description: null
        }
    },
    mounted() {
        if (this.item.id) {
            this.coverUrl = this.item.cover;
            this.name = this.item.name;
            this.description = this.item.description;
        }
    },
    methods: {
        previewCover() {
            this.cover = this.$refs.cover.files[0] || null;
            this.coverUrl = URL.createObjectURL(this.cover);
        },
        async create() {
            if (!this.name) {
                this.$toast.error('Hashtag name is required');
                return;
            }

            if (!this.cover) {
                this.$toast.error('Hashtag cover is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const formData = await this.makeFormData();

                const { data } = await HashtagService.create(formData);

                this.$emit('create', {
                    id: data.id,
                    name: this.name,
                    cover: this.coverUrl
                });

                this.reset();
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        async edit() {
            if (!this.name) {
                this.$toast.error('Hashtag name is required');
                return;
            }

            this.$root.$emit('gcLoading', 1);

            try {
                const formData = await this.makeFormData();

                const { data } = await HashtagService.edit(this.item.id, formData);

                this.$emit('edit', {
                    id: data.id,
                    name: this.name,
                    cover: this.coverUrl
                });

                this.reset();
            } catch (e) {
                this.$toast.error(e.response.data.message || e);
            }

            this.$root.$emit('gcLoading', 0);
        },
        makeFormData() {
            const formData = new FormData();
            formData.append('hashtag', this.name);
            formData.append('description', this.description);

            if (this.cover) {
                formData.append('mediaCover', this.cover);
            }

            return formData;
        },
        reset() {
            this.name = null;
            this.cover = null;
            this.coverUrl = null;
            this.$refs.cover.value = null;
            this.description = null;
        }
    }
}
</script>
<style scoped>
.cover-hashtag {
    width: 300px;
    overflow: hidden;
    position: relative;
    /*border: solid 2px red;*/
}
</style>
