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
          v-model="beneficiaryAccountId"
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
      beneficiaryAccountId: null,
    };
  },
  watch: {
    beneficiaryAccountId(newVal) {
      this.$emit('updateForm', { beneficiaryAccountId: newVal });
    },
  },
  mixins: [formMixin],
};
</script>
