/* eslint-disable */
export default [
  {
    path: 'payer',
    component: () => import('@/components/pages/my-account/transaction/Buy.vue'),
    name: 'Buy',
    meta: {
      requireAuth: true,
      userPicto: true,
      nextName: 'SelectUserTransaction',
    },
  },

  {
    path: 'conversion',
    component: () => import('@/components/pages/my-account/transaction/ConvertMoney.vue'),
    name: 'ConvertMoney',
    meta: {
      requireAuth: true,
      nextName: 'ChoiceBankCard',
      userPicto: true,
    },
  },

  // {
  //   path: 'choisissez-votre-carte',
  //   component: () => import('@/components/pages/my-account/transaction/ChoiceBankCard.vue'),
  //   name: 'ChoiceBankCard',
  //   meta: {
  //     requireAuth: true,
  //     nextName: 'SelectUserTransaction',
  //   },
  // },

  {
    path: 'choisissez-votre-beneficiaire/',
    component: () => import('@/components/pages/my-account/transaction/SelectUserTransaction.vue'),
    name: 'SelectUserTransaction',
    meta: {
      requireAuth: true,
      userPicto: true,
    },
  },

];

/* eslint-enable */
