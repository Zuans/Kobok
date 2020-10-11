import { kirimData, buatUrl } from '../utils'
import API_URL  from '../constant/index';
import store from '../store/index';


function state() {
    return {
        listKode : [],
        limit : 6,
    }
}

const mutations = {
    setListKode(state,payload) {
        state.listKode = payload;
    },
    setLimit(state,{limit}) {
        state.limit = limit;
    },
    resetKode(state){
        state.listKode = [];
        state.limit = 6;
    },
    tambahKode(state,payload) {
        state.listKode.push(payload);
    },
    hapusKode(state,id) {
        if ( state.listKode.length == 0 ) {
            state.listKode = [];
        }
        const indexKode = state.listKode.findIndex( kode => kode.id == id );
        state.listKode.splice(indexKode,1);
    }
}
const actions = {
    async ambilSemuaKode({commit},user) {
        try {
            const url = `${API_URL}/code/list`;
            const dataBody = {
                user,
            };
            const  data  = await kirimData(url,dataBody);
            commit('setListKode',data.data);
        } catch(error) {
            console.log(error);
        }
    },
    async ambilFilterKode({commit},{
        jmlKode : limit,
        opsiFltr,
        opsiUrut,
        page,
    }) {
        try {
            // Buat query
            const query = [
                { name : 'limit', value : limit ? limit : 6 },
                { name : 'sortBy' ,value : opsiFltr ? opsiFltr : 'createdAt' },
                { name : 'sort', value : opsiUrut ? opsiUrut : 'DESC' },
                { name : 'page', value : page ? page : 1 }
            ];
            const baseUrl = `${API_URL}/code/list`
            const url = buatUrl(baseUrl,query);
            const bodyData = {
                user : store.state.pengguna.user.id,
            };
            const { data } = await kirimData(url,bodyData);
            commit('setListKode',data);
            commit('setLimit',{
                limit,
            })   
        } catch (error) {
            console.log(error);
        }
    },
    tambahkanKode({commit},payload) {
        commit('tambahKode',payload);
    },
    hapuskanKode({commit},payload) {
        commit('hapusKode',payload);
    }
}

export default {
    namespaced : true,
    state,
    mutations,
    actions
}