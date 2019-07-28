import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Reg from './views/Reg.vue';

import StockDetails from './views/StockDetails.vue';

import Count from './views/Count.vue';
import Information from './views/Information.vue';
// eslint-disable-next-line camelcase
import Information_2 from './views/Information_2.vue';
import Top from '@/components/Top.vue'
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars

import PostDetail from './views/PostDetail.vue'

import StockDeal from './views/StockDeal.vue'
import Forget from './views/Forget.vue'
import Error from './views/Error.vue'

Vue.use(Router);

export default new Router({
  /*mode: 'history',*/
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      components: {
        default: Home,
        // eslint-disable-next-line quote-props
        'top': Top,

      },
    },

    {
      path: '/login',
      name: 'login',
      components: {
        default: Login,
        'top': Top,

      }
    },
    {
      path: '/reg',
      name: 'reg',
      components: {
        default: Reg,
        'top': Top,
      },
    },
    {
      path: '/stockdetails/:id',
      name: 'stockdetails',
      component: StockDetails,
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
    },
    {
      path: '/count',
      name: 'count',
      components: {
        default: Count,
        'top': Top,
      }
    },
    {
      path: '/information',
      name: 'information',
      components: {
        default: Information,
        'top': Top,
      }
    },
    {
      path: '/information-2',
      name: 'information-2',
      components: {
        default: Information_2,
        'top': Top,
      }
    },
    {
      path: '/detail/:id',
      name: 'home',
      component: PostDetail,
    },
    {
      path: '/stockdeal/:id',
      name: 'stockdeal',
      component: StockDeal,

    },
    {
      path: '*',
      component: Error,
    },
  ],
});
