<template>
  <div>
<<<<<<< HEAD
    <m-my-money boxShadow="none" background="#F5F5F5"></m-my-money>
    <l-wrapper-block background="black">
      <template v-slot:title>Mes dernières transactions :</template>
      <template v-slot:default>
        <div v-for="(transactionDay, index ) in transactions" :key="index">
          <p>{{ transactionDay.date }}</p>
=======
    <m-my-money boxShadow="none" background="#F5F5F5" :convertMoney="false"></m-my-money>
    <l-wrapper-block ref="lWrapperBlock" background="black">
      <template class="title" v-slot:title>Mes dernières transactions :</template>
      <template v-slot:default>
        <div v-for="(transactionDay, index ) in userTrasactions" :key="index" class="transaction">
          <p class="transactionDay">{{ transactionDay.date }}</p>
>>>>>>> develop
          <m-card-transaction
            v-for="(transaction, index) in transactionDay.transaction"
            :key="index"
            :name="`utilisateur ${transaction.id}`"
            :date="transactionDay.date"
            :sum="transaction.transfered_money"
          ></m-card-transaction>

        </div>
      </template>
    </l-wrapper-block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  mounted() {
    this.$Api.getMyTransaction().then((response) => response);
    console.log('toto', this.$anime);
    /**
     * @param { DOMElement } target
     * @ref OurAnimation.js
     */
    this.$anime.animationOnMounted(this.$refs.lWrapperBlock.$el.querySelectorAll('.transaction'));
  },
<<<<<<< HEAD
=======
  methods: {
    addZero(i) {
      if (i < 10) {
        i = `0${i}`;
      }
      return i;
    },
    transformDate(date) {
      const d = new Date(date);
      const h = this.addZero(d.getHours());
      const m = this.addZero(d.getMinutes());
      return `${h}h${m}`;
    },
  },

>>>>>>> develop
  computed: {
    ...mapGetters([
      'transactions',
      'userToken',
      'compteType',
      'userInfomations',
      'solde',
      'transferId',
    ]),
  },
};
</script>

<style lang="scss" scoped>

.transactionDay {
  font-weight: 800;
}
</style>
