import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@mdi/font/css/materialdesignicons.css';
import VueSession from 'vue-session';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toast-notification/dist/theme-sugar.css';


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSession, {persist: true});

Vue.use(VueToast, {
    position: 'top-right',
    duration: 12000
});

require('./assets/style.css');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
