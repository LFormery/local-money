import Vue from 'vue';
import {
  ValidationProvider, extend,
  localize, ValidationObserver,
} from 'vee-validate';
// import g from 'gsap';
import {
  required, email, min, alpha_dash, max, max_value, min_value,numeric,// eslint-disable-line
} from 'vee-validate/dist/rules';
import fr from 'vee-validate/dist/locale/fr.json';

import '@/assets/css/reset.css';
import './registerServiceWorker';
import App from './App.vue';
import Atoms from './components/atoms';
import i18n from './i18n';
import Icones from './components/atoms/Icones';
import Layouts from './components/layouts';
import Modules from './components/molecules';
import OurAnimation from './ourAnimation';
import Organisme from './components/organisms';
import router from './router';
import requestApi from './RequestApi';
import store from './store';
import styleGuild from './handlerColorPlugin';

// console.log(g);

Vue.config.productionTip = false;

localize('fr', fr);

// Add a rule.
extend('email', email);
extend('required', required);
extend('min', min);
extend('alpha_dash', alpha_dash); // eslint-disable-line
extend('max', max);
extend('max_value', max_value);
extend('min_value', min_value);
extend('numeric', numeric);

extend('majority', {
  message: () => 'vous n\'avez pas l\'âge requis',
  validate: (value) => {
    console.log(value);

    const currentDate = new Date();
    let fielDate = value;
    const year = fielDate.match(/^(\d+)-/i)[1];
    const month = fielDate.match(/-(\d+)-/i)[1];
    const day = fielDate.match(/-(\d+)$/i)[1];
    fielDate = new Date(year, month, day);

    const age = currentDate.getFullYear() - fielDate.getFullYear();
    return age > 18;
  },
});
// Register it globally

// Atoms
console.warn(Atoms, 'Atoms');
Vue.component('a-button', Atoms.AButton);
Vue.component('a-radio', Atoms.ARadio);
Vue.component('a-link', Atoms.Alink);
Vue.component('a-submit-button', Atoms.ASubmitButton);
Vue.component('a-navbar-picto', Atoms.ANavbarPicto);
Vue.component('a-picto', Atoms.APicto);
Vue.component('a-switch-button', Atoms.ASwitchButton);
Vue.component('a-user-picture', Atoms.AUserPicture);
Vue.component('a-select', Atoms.ASelect);

// Atoms Icons
console.warn(Icones, 'Icone Atoms');
Vue.component('a-icone-home', Icones.AIconeHome);
Vue.component('a-icone-community', Icones.AIconeCommunity);
Vue.component('a-icone-transaction', Icones.AIconeTransaction);
Vue.component('a-icone-commerce', Icones.AIconeCommerce);
Vue.component('a-icone-more', Icones.AIconeMore);
Vue.component('a-icone-back-arrow', Icones.AIconeBackArrow);
Vue.component('a-icone-modify', Icones.AIconeModify);

// Molecules
console.warn(Modules, 'Modules');
Vue.component('m-input', Modules.MInputText);
Vue.component('m-textarea', Modules.MTextarea);
Vue.component('m-radio', Modules.MRadio);
Vue.component('m-navbar', Modules.MnavBar);
Vue.component('m-menu', Modules.MMenu);
Vue.component('m-transaction', Modules.MTransaction);
Vue.component('m-card-transaction', Modules.MCardTransaction);
Vue.component('m-card-post', Modules.MCardPost);
Vue.component('m-my-money', Modules.MMyMoney);
Vue.component('m-contact-block', Modules.MContactBlock);
Vue.component('m-error-message', Modules.MErrorMessage);

// Layouts
console.warn(Layouts, 'Layouts');
Vue.component('l-regitster', Layouts.LRegister);
Vue.component('l-overlay', Layouts.LOverlay);
Vue.component('l-wrapper-block', Layouts.LWrapperBlock);
Vue.component('l-form-myacount', Layouts.LFormMyAcount);
Vue.component('l-header-myCompte', Layouts.LHeaderMyCompte);

// Organisme
Vue.component('o-transaction-input', Organisme.OTransactionInput);

// global
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(OurAnimation);
Vue.use(requestApi);
Vue.use(styleGuild);
new Vue({
  i18n,
  OurAnimation,
  requestApi,
  router,
  store,
  styleGuild,
  render: (h) => h(App),
}).$mount('#app');
