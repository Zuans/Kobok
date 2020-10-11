

function state() {
    return {
        tampilNotif : false,
        statusNotif : {
            error : false,
            success : false,
            process : false,
            
        },
        pesanNotif : ""
    }
}

const mutations = {
    aturNotif(state,{status,pesan}) {
        state.tampilNotif = true;
        state.statusNotif[status] = true;
        state.pesanNotif = pesan;
    },
    hapusNotif(state,status) {
        state.tampilNotif = false;
        state.statusNotif[status] = false;
        state.pesanNotif =  "";
    }
}

const actions = {
    tampilkanNotif({commit},{ status,pesan }) {
        commit('aturNotif',{ 
            status,
            pesan 
        });
        return;
    },
    hilangkanNotif({commit},{ status }) {
            commit('hapusNotif',status);
        return;
    },
    async prosesNotif({dispatch},cb){
        let dataNotif = {};
        try {
            // Buat notif process
            dataNotif = {
                status : 'process',
                pesan : 'Sedang berkomunikasi dengan server'
            }
            await dispatch('tampilkanNotif',dataNotif);
            const result = await cb();
            return result;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        } finally {
            await dispatch('hilangkanNotif',dataNotif);
        }
    }
}

export default {
    namespaced : true,
    state,
    mutations,
    actions,
}