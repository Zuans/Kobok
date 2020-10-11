<template>
  <div class="container-notif">
      <!-- If error -->
      <div v-if="status.error" class="bg-danger notif">
          <h3>{{ pesan }}</h3>
      </div>
    <!-- If success -->
      <div v-else-if="status.success" class="bg-success notif">
          <h3>{{ pesan }}</h3>
      </div>
      <!-- if on process -->
      <div v-else-if="status.process" class="bg-primary notif">
          <h3>{{ pesan }}</h3>
      </div>
      <!-- Nothing happen -->
      <div v-else ></div>
  </div>
</template>

<script>
export default {
    name : 'appNotif',
    data() {
        return {
            status : {},
            pesan : "",
        }
    },
    created() {
        // dapatkan notif status dan pesannya
        this.status = this.$store.state.notif.statusNotif;
        this.pesan = this.$store.state.notif.pesanNotif;
    }
}
</script>

<style scoped>
    
    .notif {
        position : fixed;
        padding : .7rem 1.5rem;
        top : 0;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-left-radius : .6rem;
        border-bottom-right-radius : .6rem;
        color : white;
    }
</style>