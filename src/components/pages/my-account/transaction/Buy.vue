<template>
  <ValidationProvider name="solde" :rules="'required|min_value:1|max_value:'+solde" v-slot="{errors}">
    <div>
        <p>Mon solde : {{solde}} MCL</p>
        <p>Je souhaite faire un envoi d’une valeur de</p>
        <o-transaction-input v-model="transfered_money" label="MLC" :errors="errors" name="sum_to_send" />
    </div>
  </ValidationProvider>
</template>
<script>
import { mapGetters } from 'vuex';
import formMixin from '@/mixins/formMixin';

export default {
  data() {
    return {
      transfered_money: '',
    };
  },
  watch: {
    transfered_money(newVal) {
      this.$emit('updateForm', { transfered_money: newVal });
    },
  },
  computed: {
    ...mapGetters(['solde']),
  },
  mixins: [formMixin],
};
</script>
<style lang="scss" scoped>
</style>
