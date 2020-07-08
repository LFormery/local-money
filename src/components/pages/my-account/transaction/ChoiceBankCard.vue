<template>
  <ValidationObserver ref="observer">
    <div>
<<<<<<< HEAD
      <m-input :errors="{}" name="benefit_name">Nom du bénéficiaire</m-input>
      <m-input :errors="{}" name="bank_number">Carte banquaire</m-input>
      <m-input :errors="{}" name="ccv">Ccv</m-input>
=======
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
        <ValidationProvider name="date" rules="required|min:5|max:5" max v-slot="{ errors }">
          <m-input type="tel" v-model="date" maxlength="5" mask="##/##" :errors="errors" name="date">date de validité</m-input>
        </ValidationProvider>
      </span>
>>>>>>> develop
    </div>
  </ValidationObserver>
</template>

<script>

import formMixin from '@/mixins/formMixin';

export default {
  mixins: [formMixin],
};
</script>
