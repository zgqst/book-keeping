import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Statistic from '@/views/Statistic.vue';
import Labels from '@/views/Labels.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Money,
  },
  {
    path: '/money',
    component: Money,
  },
  {
    path:'/labels',
    component:Labels
  },{
  path:'/statistic',
    component:Statistic
  }

];

const router = new VueRouter({
  routes,
});

export default router;
