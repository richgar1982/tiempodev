import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter)

import login from './components/LoginComponent.vue';
import upload from './components/UploadComponent.vue';
import error404 from './components/Error404Component.vue';

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/upload',
        component: upload
    },
    {
        path: '*',
        component: error404
    }
]

export default new VueRouter({ mode: 'history', routes: routes })