import API_URL  from '../constant/index';
import { kirimData } from '../utils/index' 


function state() {
    return {
        user : {
            id : '',
            nama : '',
            createdAt : null,
            updateAt : null,
            logIn : false,
        }
    }
}

const mutations = {
    setPengguna(state,payload){
        // insert all user data `Payload` to state
        state.user = {...payload,logIn : true };
    },
    resetPengguna(state) {
        state.user = {
            id : '',
            nama : '',
            createdAt : null,
            updateAt : null,
            logIn : false,
        }
    }
}

const actions = {
    async daftarPengguna({commit,dispatch},payload) {
        const namaPengguna = payload;
        let dataNotif = {};
        try{
             dataNotif = {
                status : 'process',
                pesan : 'Sedang mendaftarkan kamu',
            };
            await dispatch(`notif/tampilkanNotif`, dataNotif, { root : true });
            const url = `${API_URL}/user/register`;
            const { data,error,message }  = await kirimData(url,{
                name : namaPengguna,
            });
            if(error) throw new Error(message);
            commit('setPengguna',data);
            // Matikan notif process
            await dispatch('notif/hilangkanNotif',dataNotif, { root : true });
            // Ganti dengan notif success
            dataNotif = {
                status : 'success',
                pesan : `Berhasil masuk, Selamat datang ${namaPengguna}`,
            };
            await dispatch('notif/tampilkanNotif',dataNotif, { root : true });
            return;
        } catch(err) {
            // Tampilkan error
            await dispatch('notif/hilangkanNotif',dataNotif, { root : true });
            dataNotif =  {
                status : 'error',
                pesan  : err,
            };
            await dispatch('notif/tampilkanNotif',dataNotif, { root : true });
        } finally {
            setTimeout( async () => {
                await dispatch('notif/hilangkanNotif',dataNotif, { root : true });
            },2000);
        }
        return;
    },
    async loginPengguna({commit,dispatch},payload) {
        const namaPengguna = payload;
        let dataNotif  = {};
        try {
            dataNotif = {
                status : 'process',
                pesan : 'Sedang mencari info kamu...',
            }
            await dispatch(`notif/tampilkanNotif`,dataNotif,{ root : true });
            const url = `${API_URL}/user/login`;
            const { data,error,message } = await kirimData(url,{
                name : namaPengguna,
            });
            if(error) throw new Error(message);
            commit('setPengguna',data);
            // Hilangkan notif prosses
            await dispatch('notif/hilangkanNotif',dataNotif,{ root : true });
            // Ganti menjadi success
            dataNotif = {
                status : 'success',
                pesan : `Berhasil login, Selamat datang ${namaPengguna}`,
            }
            await dispatch('notif/tampilkanNotif',dataNotif,{ root : true });
        } catch(err) {
            await dispatch('notif/hilangkanNotif',dataNotif,{ root : true });
            dataNotif = {
                status : 'error',
                pesan : err,
            };
            // Munculkan pesan error
            await dispatch('notif/tampilkanNotif',dataNotif,{ root:true });
        } finally {
            setTimeout( async () => {
                await dispatch('notif/hilangkanNotif',dataNotif, { root : true });
            },2000);
        }
    },
    async logoutPengguna({commit,dispatch}) {
        try {
            commit('resetPengguna');
            const dataNotif =  {
                status : 'success',
                pesan : 'Berhasil logout',
            }
            // Reset kode di vuex
            commit('kode/resetKode',null,{ root : true });
            await dispatch('notif/tampilkanNotif',dataNotif,{ root : true });
            setTimeout( async () => {
                await dispatch('notif/hilangkanNotif',dataNotif, { root : true });
            },2000);
            return;
        } catch(err) {
            console.error(err);
        }
        return;    
    }
}

export default {
    namespaced : true,
    state,
    mutations,
    actions,
}