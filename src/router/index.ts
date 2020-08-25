import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Detail from '@/views/Detail.vue';
import Statistic from '@/views/Statistic.vue';
import NotFound from '@/views/NotFound.vue';
import Add from '@/views/Add.vue';
import Labels from '@/components/Add/Labels.vue';
import EditLabel from '@/components/EditLabel.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/detail',
    component: Detail,
    children: [
      {
        path: 'add',
        component: Add
      }
    ]
  }
  ,
  {
    path: '/detail/add/labels',
    component: Labels
  }
  ,
  {
    path: '/detail/:tagName',
    component: EditLabel
  }
  ,
  {
    path: '/statistic',
    component: Statistic
  }
  ,
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
