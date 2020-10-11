import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue} from 'bootstrap-vue'

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import store
import store from './store/index';

Vue.config.productionTip = false
Vue.use(BootstrapVue);


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
