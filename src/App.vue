<template>
  <div id="app">
    <transition name="notif">
        <AppNotifikasi v-if="tampilNotif" />
    </transition>
    <div class="header">
      <h1>Welcome to Kobok</h1>
      <h3>- Kode Boks -</h3>
    </div>
    <BagianFormPengguna  v-if="!user.logIn" />
    <BagianInfoUser v-else />
    <BagianKodeForm />
    <div class="lists-kode" v-if="user.logIn" >
      <BagianKodeFilter @formBerubah="formBerubah($event)" />
      <BagianKodeList  :formFilter="formFilter" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    BagianFormPengguna : () => import('./components/bagian/AppFormPengguna'),
    BagianInfoUser : () => import('./components/bagian/AppInfoUser'),
    BagianKodeForm : () => import('./components/bagian/AppFormKode'),
    BagianKodeFilter : () => import('./components/bagian/AppKodeFilter'),
    BagianKodeList : () => import('./components/bagian/AppKodeList'),
    AppNotifikasi : () => import('./components/AppNotif'),
  },
  data() {
    return {
      formFilter : {},
    }
  },
  methods : {
    ...mapActions('kode',[
      'ambilFilterKode',
    ]),
    ...mapActions('notif',[
      'prosesNotif',
    ]),
    async formBerubah(val) {
      try {
        this.formFilter = val;
        const cb = () => this.ambilFilterKode(val);
        await this.prosesNotif(cb);
        return val;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed : {
      ...mapState('notif',['tampilNotif']),
      ...mapState('pengguna',['user']),
  },
}
</script>

<style src="@/assets/style/style.css"></style>
<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: 'Poppins',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.notif-enter-active,.notif-leave-active {
  transition : transform  .6s ease-in-out;
}

.notif-enter, .notif-leave-to {
  transform: translateY(-200px);
}

</style>
