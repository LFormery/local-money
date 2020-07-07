<template>
  <div class="mt-10">
    <ValidationProvider name="Nom de votre entreprise" rules="required|alpha_dash|min:3" v-slot="{ errors }">
      <m-input :errors="errors" name="company_name" v-model="name" exemple="Boulangerie">Nom de votre entreprise</m-input>
    </ValidationProvider>
    <ValidationProvider name="Ville" rules="required|min:3" v-slot="{ errors }">
      <m-input :errors="errors" name="city" v-model="city" maxlength="30" exemple="Paris">Ville</m-input>
    </ValidationProvider>
    <ValidationProvider name="code postal" rules="required|min:3" v-slot="{ errors }">
      <m-input :errors="errors" name="zipCode" type="tel" v-model="zipCode" maxlength="5" exemple="75000">Code postal</m-input>
    </ValidationProvider>
    <ValidationProvider name="address" rules="required|min:6" v-slot="{ errors }">
      <m-input :errors="errors" name="first_name" v-model="address" exemple="27 Bis Rue du Progrès">Address</m-input>
    </ValidationProvider>
  </div>
</template>
<script>

import FormMixin from '@/mixins/formMixin';

export default {
  name: 'InformationName',
  data() {
    return {
      name: '',
      city: '',
      address: '',
      zipCode: '',
    };
  },
  mixins: [FormMixin],
  watch: {
    city(newVal) {
      this.$emit('updateForm', { city: newVal });
    },
    address(newVal) {
      this.$emit('updateForm', { address: newVal });
    },
    zipCode(newVal) {
      this.$emit('updateForm', { zipCode: newVal });
    },
    name(newVal) {
      this.$emit('updateForm', { name: newVal });
    },
  },
};
</script>
