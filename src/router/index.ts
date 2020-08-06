import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Detail from '@/views/Detail.vue';
import Statistic from '@/views/Statistic.vue';
import NotFound from '@/views/NotFound.vue';
import Add from '@/views/Add.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
      path: '/',
      redirect: '/detail',
    },
    {
      path: '/detail',
      component: Detail,
      children:[
        {
          path: 'add',
          component: Add
        },
      ]
    }
    ,
    {
      path: '/statistic',
      component: Statistic,
    }
    ,
    {
      path: '*',
      component: NotFound,
    }
  ];

const router = new VueRouter({
  routes,
});

export default router;
