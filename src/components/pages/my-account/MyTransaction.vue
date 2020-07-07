<template>
  <div>
    <m-my-money boxShadow="none" background="#F5F5F5"></m-my-money>
    <l-wrapper-block background="black">
      <template v-slot:title>Mes dernières transactions :</template>
      <template v-slot:default>
        <div v-for="(transactionDay, index ) in transactions" :key="index">
          <p>{{ transactionDay.date }}</p>
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
  },
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
::v-deep .transaction {
  margin: 16px 0px;
}

.transactionDay {
  font-weight: 800;
}
</style>
