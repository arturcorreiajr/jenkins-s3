<template>
    <div class="general-sidebar">
        <div class="sidebar-logo text-center pt-3 pb-4">
            <img @click="$router.push({name: 'home'})" src="@/assets/logo.webp">
        </div>
        <div class="mt-3">
            <ul class="list-group">
                <li>
                    <p class="m-0 list-group-item item-li pl-4"
                       :class="this.$route.path.includes('/home') ? 'item-li-active' : ''"
                       @click="$router.push({name: 'home'})">
                        <b-icon-bar-chart-line-fill scale="1.5" class="me-2"></b-icon-bar-chart-line-fill>
                        <span class="ml-2">Dashboard</span>
                    </p>
                </li>

                <li>
                    <p class="m-0 list-group-item item-li pl-4"
                       :class="this.$route.path.includes('/users') && !this.$route.path.includes('/moderators') ? 'item-li-active' : ''"
                       @click="$router.push({name: 'users'})">
                        <b-icon-person-lines-fill font-scale="1.5" class="me-2"></b-icon-person-lines-fill>
                        <span class="ml-2">Users</span>
                    </p>
                </li>

                <li>
                    <p class="m-0 list-group-item item-li pl-4"
                       :class="this.$route.path.includes('/payments') ? 'item-li-active' : ''"
                       @click="$router.push({name: 'payments'})">
                        <b-icon-currency-dollar font-scale="1.5" class="me-2"></b-icon-currency-dollar>
                        <span class="ml-2">Payments</span>
                    </p>
                </li>

                <li>
                    <p class="m-0 list-group-item item-li pl-4"
                       v-b-toggle.box-influencers
                       :class="this.$route.path.includes('/ambassadors') || this.$route.path.includes('promoters') ? 'item-li-active-group' : ''">
                        <b-icon-people-fill font-scale="1.5" class="me-2"></b-icon-people-fill>
                        <span class="ml-2">Influencers</span>
                    </p>

                    <b-collapse class="box-multiple-options"
                                id="box-influencers"
                                :visible="this.$route.path.includes('/ambassadors') || this.$route.path.includes('promoters')">
                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'ambassadors'})"
                           :class="this.$route.path.includes('ambassadors') ? 'item-li-active' : ''">
                            <b-icon-person-check-fill font-scale="1.5" class="me-2"></b-icon-person-check-fill>
                            <span class="ml-2">Ambassadors</span>
                        </p>

                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'promoters'})"
                           :class="this.$route.path.includes('promoters') ? 'item-li-active' : ''">
                            <b-icon-person-badge-fill font-scale="1.5" class="me-2"></b-icon-person-badge-fill>
                            <span class="ml-2">Promoters</span>
                        </p>
                    </b-collapse>
                </li>

                <li>
                    <p class="m-0 list-group-item item-li pl-4"
                       v-b-toggle.box-moderators
                       :class="this.$route.path.includes('/moderators') ? 'item-li-active-group' : ''">
                        <b-icon-shield-shaded font-scale="1.5" class="me-2"></b-icon-shield-shaded>
                        <span class="ml-2">Moderators</span>
                    </p>

                    <b-collapse class="box-multiple-options" id="box-moderators"
                                :visible="this.$route.path.includes('/moderators')">
                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'moderators-users'})"
                           :class="this.$route.path.includes('/moderators/users') ? 'item-li-active' : ''">
                            <b-icon-person-lines-fill font-scale="1.5" class="me-2"></b-icon-person-lines-fill>
                            <span class="ml-2">Users</span>
                        </p>

                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'moderators-posts'})"
                           :class="this.$route.path.includes('/moderators/posts') ? 'item-li-active' : ''">
                            <b-icon-chat-square-fill font-scale="1.5" class="me-2"></b-icon-chat-square-fill>
                            <span class="ml-2">Posts</span>
                        </p>

                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'moderators-accounts'})"
                           :class="this.$route.path.includes('/moderators/accounts') ? 'item-li-active' : ''">
                            <b-icon-person-badge-fill font-scale="1.5" class="me-2"></b-icon-person-badge-fill>
                            <span class="ml-2">Accounts</span>
                        </p>

                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'moderators-comments'})"
                           :class="this.$route.path.includes('/moderators/comments') ? 'item-li-active' : ''">
                            <b-icon-chat-dots-fill font-scale="1.5" class="me-2"></b-icon-chat-dots-fill>
                            <span class="ml-2">Comments</span>
                        </p>
                    </b-collapse>
                </li>
                <li>
                    <p class="m-0 list-group-item item-li pl-4"
                       v-b-toggle.box-competition
                       :class="this.$route.path.includes('/competition') ? 'item-li-active-group' : ''">
                        <b-icon-hand-thumbs-up-fill font-scale="1.5" class="me-2"></b-icon-hand-thumbs-up-fill>
                        <span class="ml-2">Competition Area</span>
                    </p>
                    <b-collapse class="box-multiple-options" id="box-competition"
                                :visible="this.$route.path.includes('/competition')">
                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'competition-hashtag-contest'})"
                           :class="this.$route.path.includes('/competition/hashtag-contest') ? 'item-li-active' : ''">
                            <b-icon-hash font-scale="1.5" class="me-2"></b-icon-hash>
                            <span class="ml-2">Hashtag Contest</span>
                        </p>
                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'competition-sweepstakes'})"
                           :class="this.$route.path.includes('/competition/sweepstakes') ? 'item-li-active' : ''">
                            <b-icon-dice5-fill font-scale="1.5" class="me-2"></b-icon-dice5-fill>
                            <span class="ml-2">Sweepstakes</span>
                        </p>
                        <p class="m-0 list-group-item item-li ps-4"
                           @click="$router.push({name: 'competition-top10'})"
                           :class="this.$route.path.includes('/competition/top10') ? 'item-li-active' : ''">
                            <b-icon-list-check font-scale="1.5" class="me-2"></b-icon-list-check>
                            <span class="ml-2">Top 10</span>
                        </p>
                    </b-collapse>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
}
</script>
<style scoped>
.general-sidebar {
    width: 12vw;
    min-height: 100vh;
    background-color: var(--background-default);
    background-repeat: no-repeat;
    background-position: bottom 2vh center;
    text-transform: uppercase;
    font-family: var(--font-family);
    font-size: var(--font-size-default);
    font-weight: var(--font-weight-primary);
    letter-spacing: var(--font-lether-spacing);
}

.sidebar-logo img {
    width: 100px;
    cursor: pointer;
}

.list-group {
    border-radius: 0 !important;
}

.item-li {
    color: white !important;
    background: transparent !important;
    cursor: pointer !important;
    transition: all .3s;
    border-radius: 0 !important;
}

.item-li:hover {
    background: var(--background-hover-default) !important;
    transition: all .3s;
}

.item-li-active-group {
    background: var(--background-hover-default) !important;
}

.item-li-active {
    background: rgba(239, 191, 21, 0.96) !important;
}

.box-multiple-options {
    background: var(--background-sub-items);
}
</style>
