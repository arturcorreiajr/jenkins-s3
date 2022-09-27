<template>
    <div class="general-navbar mb-3">
        <div class="navbar-profile-picture-content float-end">
            <div class="navbar-profile-picture-circle ml-3 mt-3" v-b-toggle="'box-profile'">
                <img :src="user.img || require('@/assets/no-profile.jpeg')" alt="Profile picture - GotChosen">
            </div>

            <b-collapse id="box-profile" class="box-profile">
                <b-card>
                    <ul class="list-group">
                        <li class="list-group-item item-li cursor-pointer" @click="logout">
                            <b-icon-box-arrow-right font-scale="1.3" class="me-2"></b-icon-box-arrow-right>
                            <span class="ml-2">Logout</span>
                        </li>
                    </ul>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>
<script>
import AuthService from '../../services/AuthService';

export default {
    name: 'Navbar',
    data() {
        return {
            user: {},
        }
    },
    mounted() {
        this.user = {};
    },
    methods: {
        logout() {
            AuthService.logout();
            this.$toast.success('You are logged out, wait a moment.')
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    },
}
</script>
<style scoped>.general-navbar {
    background: #fff;
    height: 73.58px;
    border-bottom: solid 2px var(--background-default);
    -webkit-box-shadow: 5px 5px 17px -5px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 5px 5px 17px -5px rgba(0, 0, 0, 0.29);
    box-shadow: 5px 5px 17px -5px rgba(0, 0, 0, 0.29);
    position: relative;
}

.navbar-profile-picture-content {
    width: 90px;
    height: 100%;
}

.navbar-profile-picture-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}

.navbar-profile-picture-circle > img {
    width: 100%;
    border-radius: 50%;
}

.box-profile {
    min-width: 180px;
    position: absolute;
    top: calc(100% + 1px);
    right: 0;
    -webkit-box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.45);
    -moz-box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.45);
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.45);
    text-transform: uppercase;
    font-family: var(--font-family);
    font-size: 12px;
    font-weight: var(--font-weight-primary);
    letter-spacing: var(--font-lether-spacing);
}

.box-profile .card {
    border-radius: 0 !important;
}

.card-body {
    padding: 0;
}

.item-li {
    transition: all .3s;
    border-radius: 0 !important;
}

.item-li:hover {
    transition: all .3s;
    background: var(--background-default);
    color: #fff;
}
</style>
