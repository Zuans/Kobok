import Vue from 'vue';
import VueRouter from 'vue-router';


import UpdateKode from './routes/UpdateKode';

Vue.use(VueRouter);

const routes = new VueRouter({
    mode : 'history',
    routes : [
        {
            path : '/update-kode',
            name : 'update-kode',
            component : UpdateKode,
        }
    ]
});

export default routes;