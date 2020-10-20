<template>
  <div class="kode-kotak">
      <div v-html="kode"></div>
        <AppTombol 
            @btn-click="hapusKode(kodeId)"
            bgColor="danger"
        >
            <p>Delete</p>
        </AppTombol>
  </div>
</template>

<script>
import { mapActions }  from 'vuex';
import API_URL from '@/constant/index';
import { kirimData } from '@/utils/index';

export default {
    name : 'appKodeKotak',
    components : {
        AppTombol : () => import('./AppTombol'),
    },
    props : {
        kode : {
            type : String,
            default : '',
        },
        kodeId : {
            type : String,
            default : '',
        },
    },
    methods : {
        ...mapActions('notif',[
            'prosesNotif',
            'tampilkanNotif',
            'hilangkanNotif'
        ]),
        ...mapActions('kode',[
            'hapuskanKode'
        ]),
        async hapusKode(id) {
            let dataNotif = {};
            try {
                const url = `${API_URL}/code/delete`
                const bodyData = {
                    id,
                    user : this.$store.state.pengguna.user.id,
                };
                // Init callback
                const cb = () => kirimData(url,bodyData);
                const {error,message } = await this.prosesNotif(cb);
                // Check error
                if ( error ) throw new Error(message);
                dataNotif = {
                    status : 'success',
                    pesan  : 'Kode berhasil dihapus'
                }
                // Hapus kode di vuex dan tampikan pesan sukses
                await this.hapuskanKode(id);
                await this.tampilkanNotif(dataNotif);
            } catch (error) {
                console.log(error);
                dataNotif = {
                    status : 'error',
                    pesan : error,
                };
            } finally {
                setTimeout( async() => {
                    await this.hilangkanNotif(dataNotif);
                },1500);
            }
        },
        updateKode(kodeId) {
            console.log(kodeId);
            this.$router.push({ name : 'update-kode' });
        }
    }
}
</script>

<style>
    .kode-kotak {
        background-color : #202020;
        text-align : left;
        width : 100%;
        height : 100%;
        border-radius : 2rem;
        padding : 1rem 1.5rem;
        margin-left : 2rem;
    }
</style>