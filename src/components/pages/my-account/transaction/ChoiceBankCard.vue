<template>
    <div>
      <ValidationProvider name="Nom du bénéficiaire" rules="required|alpha_dash|min:3" v-slot="{ errors }">
        <m-input :errors="errors" v-model="name" name="benefit_name">nom du bénéficiaire</m-input>
      </ValidationProvider>
      <ValidationProvider name="numéro de carte bancaire" rules="required|min:19|max:19"  v-slot="{ errors }">
        <m-input :errors="errors" mask="#### #### #### ####" v-model="numbers_card" maxlength="19" name="bank_number">numéro de carte bancaire</m-input>
      </ValidationProvider>
      <span class="ccvAndDate">
        <ValidationProvider name="cvc" rules="required|numeric|min:3|max:3" v-slot="{ errors }">
          <m-input type="tel" class="cvc" maxlength="3" :errors="errors" v-model="cvc" name="cvc">Ccv</m-input>
        </ValidationProvider>
        <ValidationProvider name="date" rules="required" max v-slot="{ errors }">
          <m-input type="date" v-model="date" :errors="errors" name="date">date de validité</m-input>
        </ValidationProvider>
      </span>
    </div>
</template>

<script>

import formMixin from '@/mixins/formMixin';

export default {
  data() {
    return {
      name: '',
      numbers_card: '',
      cvc: '',
      date: '',
    };
  },
  mixins: [formMixin],
  watch: {
    name(newVal) {
      this.$emit('updateForm', { name: newVal });
    },
    numbers_card(newVal) {
      this.$emit('updateForm', { numbers_card: newVal });
    },
    cvc(newVal) {
      this.$emit('updateForm', { cvc: newVal });
    },
    date(newVal) {
      this.$emit('updateForm', { date: newVal });
    },
  },
};
</script>

<style lang="scss">

.ccvAndDate {
  display: flex;
  justify-content: space-between;
  max-width: 340px;
}
.cvc {
  width: 100px;
}

</style>
