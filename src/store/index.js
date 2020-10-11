import Vue from 'vue';
import Vuex from 'vuex';

// Import Modules
import pengguna from './pengguna';
import notif from './notif';
import kode from './kode';

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
    state() {
        return {};
    },
    modules : {
        pengguna,
        notif,
        kode,
    }
});

export default store;