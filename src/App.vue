<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'transactions',
      'userToken',
      'userInfomations',
      'compteType',
      'userId',
      'solde',
      'transferId',
      'companiesList',
      'companyPosts',
      'contacts',
    ]),
  },
  mounted() {
    this.$Api.getDetails();
  },
  created() {
    if (this.userToken) {
      this.$Api.setToken(this.userToken);
    } if (this.userInfomations.type) {
      this.$Api.setUserType(this.userInfomations.type);
    }

    // listen whene a user come to log for set a token in the store, add after set other infomation
    this.$Api.addEventListener('session-user-login', (event) => {
      this.$store.dispatch('setToken', event.detail.token);
      // get information of user if have a token
      this.$Api.setToken(event.detail.token);
      this.$Api.getUserInfo();
    });

    // set infomation of user
    this.$Api.addEventListener('session-user-information', (event) => {
      this.$store.dispatch('setUserInformations', event.detail);
      this.$Api.setUserType(event.detail.type);
      this.$Api.getDetails();
    });

    // set infomation of user
    this.$Api.addEventListener('session-user-details', (event) => {
      this.$store.dispatch('setSolde', event.detail.available_cash);
      this.$store.dispatch('setTransferId', event.detail.account_id);
    });

    this.$Api.addEventListener('user-registred', (event) => {
      this.$Api.login({
        username: event.detail.email,
        password: event.detail.password,
      }).then(() => this.$router.push({ name: 'Home' }));
    });

    this.$Api.addEventListener('session-user-transactions', (event) => {
      this.$store.dispatch('setTransactions', event.detail);
    });

    this.$Api.addEventListener('companies-list', (event) => {
      this.$store.dispatch('setCompaniesList', event.detail);
    });

    this.$Api.addEventListener('session-user-companypost', (event) => {
      this.$store.dispatch('setCompanyPosts', event.detail);
    });

    this.$Api.addEventListener('user-contacts', (event) => {
      if (event.detail.Information) {
        return this.$store.dispatch('setContacts', []);
      }
      return this.$store.dispatch('setContacts', event.detail);
    });

    this.$Api.addEventListener('', (event) => {
      if (event.detail.Information) {
        return this.$store.dispatch('setContacts', []);
      }
      return this.$store.dispatch('setContacts', event.detail);
    });

    this.$Api.addEventListener('remove-contact', (event) => this.$store.dispatch('removeContact', event.detail));
    this.$Api.addEventListener('composant-gouvernanceList', (event) => this.$store.dispatch('setGouvernanceList', event.detail));
  },
  methods: {
    setAppMargin() {
      document.querySelector('#app').style.margin = '0px';
    },
  },
  watch: {
    $route(to) {
      if (to.name === 'Langing') {
        this.setAppMargin();
      }
    },
  },
};

</script>

<style lang="scss">
#app {
  min-height: 100vh;
  max-width: 687px;
  margin: auto;
}
body {
   background-color: #00000005;
}
</style>
