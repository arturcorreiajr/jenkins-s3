import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login';
import AuthService from './services/AuthService';
import ListUsers from "./views/Users/List";
import CreateUser from "./views/Users/Create";
import EditUser from "./views/Users/Edit";
import ModeratorsUsers from "./views/Moderators/Users/List";
import ModeratorsPosts from "./views/Moderators/Posts/List";
import ModeratorsPostsEdit from "./views/Moderators/Posts/Edit";
import ModeratorsComments from "./views/Moderators/Comments/List";
import ModeratorsCommentsEdit from "./views/Moderators/Comments/Edit";
import ModeratorsAccounts from "./views/Moderators/Accounts/List";
import ModeratorsAccountsEdit from "./views/Moderators/Accounts/Edit";
import CompetitionHashtagContest from "./views/Competition/Contests/List";
import CompetitionHashtagContestCreate from "./views/Competition/Contests/Create";
import CompetitionHashtagContestEdit from "./views/Competition/Contests/Edit"
import CompetitionSweepstakes from "./views/Competition/Sweepstakes/List"
import CompetitionTop10 from "./views/Competition/Top10/List";
import CompetitionTop10Manage from "./views/Competition/Top10/Manage";
import ListPayments from "./views/Payments";
import ListAmbassadors from "./views/Influencers/Ambassadors/List";
import AmbassadorsCreate from "./views/Influencers/Ambassadors/Create";
import AmbassadorsReport from "./views/Influencers/Ambassadors/Report";
import AmbassadorsEdit from "./views/Influencers/Ambassadors/Edit";
import AmbassadorsBonusReport from "./views/Influencers/Ambassadors/BonusReport";
import ListPromoters from "./views/Influencers/Promoters/List";
import PromotersCreate from "./views/Influencers/Promoters/Create";
import PromotersReport from "./views/Influencers/Promoters/Report";
import PromotersEdit from "./views/Influencers/Promoters/Edit";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                auth: false,
                redirect: true,
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                auth: true
            },
        },
        {
            path: '/users',
            name: 'users',
            component: ListUsers,
            meta: {
                auth: true
            },
        },
        {
            path: '/users/create',
            name: 'create-user',
            component: CreateUser,
            meta: {
                auth: true
            },
        },
        {
            path: '/users/edit/:id',
            name: 'edit-user',
            component: EditUser,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/users',
            name: 'moderators-users',
            component: ModeratorsUsers,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/posts',
            name: 'moderators-posts',
            component: ModeratorsPosts,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/posts/:id',
            name: 'moderators-posts-edit',
            component: ModeratorsPostsEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/comments',
            name: 'moderators-comments',
            component: ModeratorsComments,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/comments/:id',
            name: 'moderators-comments-edit',
            component: ModeratorsCommentsEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/accounts',
            name: 'moderators-accounts',
            component: ModeratorsAccounts,
            meta: {
                auth: true
            },
        },
        {
            path: '/moderators/accounts/:id',
            name: 'moderators-accounts-edit',
            component: ModeratorsAccountsEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '/competition/hashtag-contest',
            name: 'competition-hashtag-contest',
            component: CompetitionHashtagContest,
            meta: {
                auth: true
            },
        },
        {
            path: '/competition/hashtag-contest/create',
            name: 'competition-hashtag-contest-create',
            component: CompetitionHashtagContestCreate,
            meta: {
                auth: true
            },
        },
        {
            path: '/competition/hashtag-contest/:id',
            name: 'competition-hashtag-contest-edit',
            component: CompetitionHashtagContestEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '/competition/sweepstakes',
            name: 'competition-sweepstakes',
            component: CompetitionSweepstakes,
            meta: {
                auth: true
            },
        },
        {
            path: '/competition/top10',
            name: 'competition-top10',
            component: CompetitionTop10,
            meta: {
                auth: true
            },
        },
        {
            path: '/competition/top10/:reference/:region',
            name: 'competition-top10-manage',
            component: CompetitionTop10Manage,
            meta: {
                auth: true
            },
        },
        {
            path: '/payments',
            name: 'payments',
            component: ListPayments,
            meta: {
                auth: true
            },
        },
        {
            path: '/ambassadors',
            name: 'ambassadors',
            component: ListAmbassadors,
            meta: {
                auth: true
            },
        },
        {
            path: '/ambassadors/create',
            name: 'ambassadors-create',
            component: AmbassadorsCreate,
            meta: {
                auth: true
            },
        },
        {
            path: '/ambassadors/report/:start/:end',
            name: 'ambassadors-report',
            component: AmbassadorsReport,
            meta: {
                auth: true
            },
        },
        {
            path: '/ambassadors/edit/:id',
            name: 'ambassadors-edit',
            component: AmbassadorsEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '/ambassadors/bonus-report/:start/:end',
            name: 'ambassadors-bonus-report',
            component: AmbassadorsBonusReport,
            meta: {
                auth: true
            },
        },
        {
            path: '/promoters',
            name: 'promoters',
            component: ListPromoters,
            meta: {
                auth: true
            },
        },
        {
            path: '/promoters/create',
            name: 'promoters-create',
            component: PromotersCreate,
            meta: {
                auth: true
            },
        },
        {
            path: '/promoters/report/:start/:end/:reportType',
            name: 'promoters-report',
            component: PromotersReport,
            meta: {
                auth: true
            },
        },
        {
            path: '/promoters/edit/:id',
            name: 'promoters-edit',
            component: PromotersEdit,
            meta: {
                auth: true
            },
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = AuthService.getToken();

    if (!token && (to.meta.auth || to.meta.auth === undefined)) {
        return router.push({
            name: 'login'
        });
    }

    if (token && to.meta.redirect) {
        return router.push({
            name: 'home'
        });
    }

    next();
})

export default router;
