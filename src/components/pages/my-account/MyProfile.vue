<template>
  <div>
    <l-header-informations :name=" userInfomations.first_name">
      <template v-slot:mainText >{{ userInfomations.first_name }}</template>
      <template v-slot:subText >Votre identifiant : {{userInfomations.id}}<br> <span v-if="compteType ==='company'">Compte profesionne</span></template>
    </l-header-informations>
   <a-switch-button
      name="switch__page__transaction"
      v-model="mode"
      :leftText="switchButton.leftText"
      :rightText="switchButton.rightText"
    />
    <router-view :contacts="contacts" ></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderInformation from '@/components/molecules/MHeaderInformation.vue';

export default {
  data() {
    return {
      mode: this.$route.name,
      switchButton: {
        leftText: {
          text: 'Mes contacts',
          value: 'myContacts',
        },
        rightText: {
          text: 'Mes informations',
          value: 'MyInformations',
        },
      },
    };
  },
  components: {
    'l-header-informations': HeaderInformation,
  },
  watch: {
    mode(newPageName) {
      if (newPageName !== 'myContacts' || newPageName !== 'MyInformation') {
        this.$router.push({ name: newPageName }).catch(() => {});
      }
    },
    $route(to) {
      this.mode = to.name;
    },
  },
  computed: {
    ...mapGetters([
      'transactions',
      'userToken',
      'userInfomations',
      'compteType',
      'companyPosts',
      'solde',
      'transferId',
      'contacts',
    ]),
  },
};
</script>
