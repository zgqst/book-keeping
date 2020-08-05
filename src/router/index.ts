import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Detail from '@/views/Detail.vue';
import Statistic from '@/views/Statistic.vue';
import Labels from '@/views/Labels.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/detail',
  },
  {
    path: '/detail',
    component: Detail,
  },
  {
    path: '/labels',
    component: Labels,
  },
  {
    path: '/statistic',
    component: Statistic,
  },
  {
    path: '*',
    components: {NotFound},
  },
];

const router = new VueRouter({
  routes,
});

export default router;
