/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';



router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }

    var { authorize } = to.meta;
    var accessToken = localStorage.getItem('accessToken');
    if (from.path !== '/login' && to.path !== '/login' && authorize){
        if(accessToken == null){
            router.push({ path: '/login'});
        }
    }
    next()
  })
  
  router.afterEach((to, from) => {
    NProgress.done()
  })



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueToast);


// axios
import axios from "./axios.js"
Vue.prototype.$http = axios;


// axios
//import axios from "./axios.js"
//Vue.prototype.$http = axios;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('login-component', require('./components/LoginComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app_content',
    router,
});
