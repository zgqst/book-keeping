import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/views/Layout.vue';
import Icon from '@/components/Icon.vue';
import DatePicker from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const Modal =require('ant-design-vue/es/modal/Modal').default;
Vue.use(Modal);
Vue.use(DatePicker);

Vue.config.productionTip = false
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')


