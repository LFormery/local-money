import Vue from 'vue';
import VueRouter from 'vue-router';
import Inscription from '@/views/Inscription.vue';
import Register from '@/views/Register.vue';
import MyAccount from '@/views/MyAccount.vue';
import Confirm from '@/views/ConfirmPage.vue';
import store from '@/store';
import inscriptionChildrens from './children/inscription';
import myAccountChildrens from './children/myAccount';

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
