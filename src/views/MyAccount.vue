<template>
  <div class="myAccount">
    <l-header-myCompte :name="userInfomations.first_name" />
    <div class="myAccountContenu">
      <router-view />
    </div>
    <m-navbar
      @updateState="menuIsOpen = !menuIsOpen"
      :navPages="navMain"
      :isOpen="menuIsOpen"
      :navPagesSecondary="navSecondary"
      :currentPageName="this.$router.currentRoute.name"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyAccount',
  data() {
    return {
      menuIsOpen: false,
      navMain: [
        {
          functionBind: () => {
            this.switchPage('Home');
          },
          pageNameBind: 'Home',
          pageName: 'Accueil',
          componentId: 'a-icone-home',
        },
        {
          functionBind: () => {
            this.switchPage('Commerce');
          },
          pageNameBind: 'Commerce',
          pageName: 'Mes commerçant',
          componentId: 'a-icone-commerce',
        },
        {
          functionBind: () => {
            this.switchPage('Community');
          },
          pageNameBind: 'Community',
          pageName: 'Communauté',
          componentId: 'a-icone-community',
        },
        {
          functionBind: () => {
            this.switchPage('MyTransaction');
          },
          pageNameBind: 'MyTransaction',
          pageName: 'Mes transaction',
          componentId: 'a-icone-transaction',
        },
      ],
      navSecondary: [
        {
          functionBind: () => {
            this.switchPage('Buy');
          },
          pageNameBind: 'Payer',
        },
        {
          functionBind: () => {
            this.switchPage('ConvertMoney');
          },
          pageNameBind: 'Convertire mon argent',
        },
        {
          functionBind: () => {
            this.switchPage('Commerce');
          },
          pageNameBind: 'Mes favoris',
        },
        {
          functionBind: () => {
            this.switchPage('Community');
          },
          pageNameBind: 'Communauté',
        },
        {
          functionBind: () => {
            this.switchPage('myContacts');
          },
          pageNameBind: 'Mes contacts',
        },
        {
          functionBind: () => {
            this.switchPage('MyInformations');
          },
          pageNameBind: 'Mes informations',
        },
        {
          pageNameBind: 'Déconnexion',
          functionBind: () => { this.$store.dispatch('reset'); this.switchPage('Register'); },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['compteType', 'userToken', 'userInfomations']),
  },
  methods: {
    switchPage(pageName) {
      if (this.currentPageName !== pageName) {
        console.log(this.currentPageName, pageName);
        this.$router.push({ name: pageName });
        this.menuIsOpen = false;
      }
    },
    getDetail() {
      if (this.compteType) {
        this.$Api
          .getDetails(this.compteType)
          .then(() => {
            console.log('ok');
          })
          .catch(() => {
            this.$store.dispatch('reset');
            this.$router.push('Register');
          });
      }
      // else {
      //   this.$Api.getUserInfo(this.userToken)
      //     .then(() => {
      //       this.getDetail();
      //     })
      //     .catch(() => {
      //       this.$store.dispatch('reset'); this.$router.push('Register');
      //     });
      // }
    },
  },
  mounted() {
    this.getDetail();
    if (this.userInfomations.type === 'company') {
      this.navSecondary.splice(2, 0, {
        functionBind: () => {
          this.switchPage('SendPost');
        },
        pageNameBind: 'donner de mes nouvelles',
      });
    }
  },
  watch: {
    compteType() {
      this.getDetail();
    },
    $route() {
      this.navMenuState = false;
    },
  },
};

</script>

<style lang="scss" scoped>
.myAccountContenu {
  /* padding: 0 20px; */
}

.myAccount {
  padding: 0px 10px;
  padding-top: 10px;
  padding-bottom: 60px;
}

.burger__menu {
  position: absolute;
  right: 10px;
}
</style>
