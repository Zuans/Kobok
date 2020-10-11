<template>
  <div class="list-kode">
      <h1>List kode</h1>
      <div class="line-black mx-auto mt-3 mb-5 w-25"></div>
      <div class="navigasi">
          <AppTombol
            :disabled="disabled.sebelumnya"  
            @btn-click="sebelumDiKlik" 
          >Sebelumnya</AppTombol>
          <AppTombol 
            :disabled="disabled.selanjutnya"   
            @btn-click="selanjutDiKlik" 
          >Selanjutnya
          </AppTombol>
      </div>
      <div class="list-kode-grid">
        <AppKodeKotak 
            v-for="(kode,index) in $store.state.kode.listKode" 
            :key="index" 
            :kode="kode.code"
            :kodeId="kode.id"
        />
      </div>
      <br>
      <br>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { mapState } from 'vuex';
// import { kirimData } from '@/utils/index';
// import API_URL from '@/constant/index';
export default {
    name : 'appListKode',
    components : {
        AppKodeKotak : () => import('../AppKodeKotak'),
        AppTombol : () => import('../AppTombol'),
    },
    props : {
        formFilter : {
            type : Object,
        }
    },
    data() {
        return {
            index : 1,
            disabled : {
                selanjutnya : false,
                sebelumnya : true,
            }
        }
    },
    async created() {
        const userId = this.$store.state.pengguna.user.id;
        await this.ambilSemuaKode(userId);
    },
    methods : {
        ...mapActions('kode',[
            'ambilSemuaKode',
            'ambilFilterKode',
        ]),
        ...mapActions('notif',[
            'prosesNotif',
        ]),
        async selanjutDiKlik() {
            // disable jika listkode kosong
            if ( !this.$store.state.kode.listKode ) return this.disabled.selanjutnya = true;
            // Kirim request halaman  selanjutnya
            try {
                this.index++
                this.disabled.sebelumnya = false;
                const cb = async () => await this.ambilFilterKode({...this.formFilter,page : this.index });
                await this.prosesNotif(cb);
            } catch(err) {
                console.log(err);
            }
        },
        async sebelumDiKlik() {
            //  Jika index kurang dari 1 matikan tombol sebelumnya 
            if ( this.index <= 1 ) return this.disabled.sebelumnya = true;
            try {
                // disable jika listkode kosong
                this.index--;
                this.disabled.selanjutnya = false;
                const cb = async () =>  await this.ambilFilterKode({...this.formFilter,page : this.index });
                await this.prosesNotif(cb);
            } catch(err) {
                console.log(err);
            }
        }
    },
    watch : {
        formFilter : {
            deep : true,
            handler : function(val){
                // If formFilter has change reset index 
                this.index = 0;
                return val;
            } 
        }
    }
}
</script>

<style lang="scss">
    .list-kode {
        padding : 0rem 3rem;

        .list-kode-grid {
            display : grid;
            grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
            grid-auto-rows : minmax(400px,1fr);
            grid-gap : 2rem;
            text-align :lef
            
        }

        .navigasi {
            display : flex;
            margin-bottom: 2rem;
            justify-content : center;

            div {
                margin-left : 1rem;
            }
        }
    }

</style>