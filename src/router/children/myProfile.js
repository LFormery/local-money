/* eslint-disable */
export default [
  {
    path: 'mes-contacts',
    component: () => import('@/components/pages/my-account/MyProfile/myContacts.vue'),
    name: 'myContacts',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'ajouter-modifier-contact/:type/',
    component: () => import('@/components/pages/my-account/MyProfile/AddModifyContact.vue'),
    name: 'AddModifyContact',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'mes-informations',
    component: () => import('@/components/pages/my-account/MyProfile/MyInformations.vue'),
    name: 'MyInformations',
    meta: {
      requireAuth: true,
    },
  },
  
];

/* eslint-enable */
