import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Register from '@/views/Register.vue';
import Confirm from '@/views/ConfirmPage.vue';
import MyAccount from '@/views/MyAccount.vue';
import Inscription from '@/views/Inscription.vue';
import Landing from '../components/pages/landing/Landing.vue';
import myAccountChildrens from './children/myAccount';
import inscriptionChildrens from './children/inscription';

Vue.use(VueRouter);

const routes = [
  {
    path: '/mon-compte',
    name: 'MyAccount',
    component: MyAccount,
    children: myAccountChildrens,
  },
  {
    path: '/',
    name: 'Register',
    component: Register,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription,
    children: inscriptionChildrens,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: 'confirmation',
    name: 'Confirmation',
    component: Confirm,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/presentation-de-l\'app',
    name: 'Landing',
    component: Landing,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    return store.getters.userToken ? next() : next({ name: 'Register' });
  }
  return !store.getters.userToken ? next() : next({ name: 'Home' });
});

export default router;
