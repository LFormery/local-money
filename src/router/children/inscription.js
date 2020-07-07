/* eslint-disable */
export default [
  {
    path: 'choisissez-votre-monnaie',
    component: () => import('../../components/pages/inscription/GouvernanceChoice.vue'),
    name: 'GouvernanceChoice',
    meta: {
      submit : false,
      nextPath: 'account-type',
      title: 'Quel type de compte souhaitez vous creer ?',
      subText: 'Bienvenue sur NeyMo !',
    },
  },
  {
    path: 'account-type',
    component: () => import('../../components/pages/inscription/AccountType.vue'),
    name: 'AccountType',
    meta: {
      submit : false,
      nextPath: 'first-information',
      previousPath: 'choisissez-votre-monnaie',
      title: 'Quel type de compte souhaitez vous creer ?',
      subText: 'Bienvenue sur NeyMo !',
    },
  },
  
  {
    path: 'particular-first-information',
    component: () => import('../../components/pages/inscription/ParticularMainInformation.vue'),
    meta: {
      submit : false,
      nextPath: 'contact-info',
      previousPath: 'account-type',
      title: 'Inscription',
      subText: 'Nous avons besoin de quelques informations',
    }
  },



  {
    path: 'particular-contact-info',
    component: () => import('../../components/pages/inscription/ParticularContactInformation.vue'),
    meta: {
      nextPath: 'verification-information',
      submit : false,
      previousPath: 'particular-first-information',
      title: 'Inscription',
      subText: 'Ces informations nous sont utiles afin de vous identifier',
    }
  },

  {
    path: 'particular-verification-information',
    component: () => import('../../components/pages/inscription/ParticularVerificationInformation.vue'),
    meta: {
      nextPath: '',
      submit : true,
      previousPath: 'particular-contact-info',
      title:  'Inscription',
      subText: '',
    }
  },


// DONT DELETE THIS

  //company routs

  {
    path: 'company-first-information',
    component: () => import('../../components/pages/inscription/CompanyMainInformation.vue'),
    meta: {
      submit : false,
      nextPath: 'contact-info',
      previousPath: 'account-type',
      title: 'Inscription',
      subText: 'Nous avons besoin de quelques informations',
    }
  },



  {
    path: 'company-contact-info',
    component: () => import('../../components/pages/inscription/CompanyContactInformation.vue'),
    meta: {
      nextPath: 'verification-information',
      submit : false,
      previousPath: 'company-first-information',
      title: 'Inscription',
      subText: 'Ces informations nous sont utiles afin de vous identifier',
    }
  },

  {
    path: 'company-verification-information',
    component: () => import('../../components/pages/inscription/CompanyVerificationInformation.vue'),
    meta: {
      nextPath: '',
      submit : true,
      previousPath: 'company-contact-info',
      title: 'Inscription',
      subText: 'Ces informations nous sont utiles afin de vous identifier',
    }
  },
  
];

/* eslint-enable */
