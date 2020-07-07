<template>
  <div>
    <p>Montant à envoyer {{transferedMoney || 0}} MCL</p>
    <div>
      <ValidationProvider
        name="Identifiant du bénéficiaire"
        rules="required|min:2"
        v-slot="{ errors }"
      >
        <m-input
          :errors="errors"
          name="zipCode"
          type="tel"
          v-model="beneficiaryAccountNumber"
          maxlength="5"
          exemple="AC14FG"
        >Identifiant du bénéficiaire</m-input>
      </ValidationProvider>
      <!-- // dont remove -->
      <!-- <m-input :errors="{}" name="send_name">Nom de l’envoie</m-input> -->
    </div>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin';

export default {
  data() {
    return {
      beneficiaryAccountNumber: null,
    };
  },
  watch: {
    beneficiaryAccountNumber(newVal) {
      this.$emit('updateForm', { beneficiaryAccountNumber: newVal });
    },
  },
  mixins: [formMixin],
};
</script>
