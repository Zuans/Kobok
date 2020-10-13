<template>
  <div class="info-user">
      <h1>Hi, Welcome {{ user.name }}</h1>
      <AppButton @btn-click="logoutUser" txtColor="white" bgColor="danger">
          <p>Logout</p>
      </AppButton>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
    name : 'infoUser',
    components : {
        AppButton : () => import('../AppTombol'),
    },
    methods: {
        ...mapActions('pengguna',['logoutPengguna']),
        async logoutUser() {
            try {
                await this.logoutPengguna();
            } catch(err) {
                console.error(err);
            }
       }
    },
    computed : {
        ...mapState('pengguna',['user']),
    }
}
</script>

<style scoped>
    .info-user {
        display: flex;
        margin-top : 4rem;
        justify-content: space-between;
        min-height : 20vh;
        padding : 2rem;
        background-color : #11ac57;
        text-align : left;
        color : white;
        border-bottom: 4px solid #1a1818;
    }
</style>