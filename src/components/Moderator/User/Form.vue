<template>
    <div class="mt-3">

        <div class="col-12">
            <div class="p-2 form-user">
                <div class="form-user-avatar" v-show="user.avatarUrl">
                    <img class="w-100" :src="user.avatarUrl" alt="User profile - GotChosen">
                </div>
                <a :href="profile" target="_blank" class="text-decoration-none text-primary">
                    <b-icon-person-fill></b-icon-person-fill>
                    {{ `@${user.username}` }}
                </a>
                <div class="mt-2">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" disabled v-model="user.username">
                </div>
                <div class="mt-2">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" disabled v-model="name">
                </div>
                <div class="mt-2">
                    <label class="form-label">Referred by</label>
                    <input type="text" class="form-control" disabled v-model="referralUsername">
                </div>
                <div class="mt-2">
                    <label class="form-label">Posts</label>
                    <input type="text" class="form-control" disabled v-model="user.userStats.posts">
                </div>
                <div class="mt-2">
                    <label class="form-label">Followers</label>
                    <input type="text" class="form-control" disabled v-model="user.userStats.followers">
                </div>
                <div class="mt-2">
                    <label class="form-label">Followings</label>
                    <input type="text" class="form-control" disabled v-model="user.userStats.following">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FormApiUser',
    props: {
        user: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    mounted() {
    },
    computed: {
        profile() {
            if (this.user.id) {
                return `${process.env.VUE_APP_GOT_CHOSEN_URL}/@${this.user.username}`;
            }

            return null;
        },
        name() {
            if (this.user.id) {
                const {value: name} = this.user.settings.filter(item => item.key === 'name')[0] || {value: null};
                return name;
            }

            return null;
        },
        referralUsername() {
            if (this.user.referralUser) {
                return this.user.referralUser.username;
            }

            return null;
        }
    },
    methods: {}
}
</script>
<style scoped>
.form-user {
    background: #fcfcfc;
    border: solid 1px #ddd;
}

.form-user-avatar {
    width: 200px;
    overflow: hidden;
}
</style>
