<template>
  <ValidationObserver ref="observer">
    <div>
      <ValidationProvider name="Nom" rules="required|alpha_dash|min:3" v-slot="{ errors }">
        <m-input :errors="errors" name="first_name" v-model="firstName" exemple="Guilloux">Nom</m-input>
      </ValidationProvider>
      <ValidationProvider name="prenom" rules="required|min:3" v-slot="{ errors }">
        <m-input v-model="lastName" name="last_name" :errors="errors" exemple="Brontis" class="mt-4">Prenom</m-input>
      </ValidationProvider>
    </div>
  </ValidationObserver>
</template>
<script>

import FormMixin from '@/mixins/formMixin';

export default {
  name: 'InformationName',
  data() {
    return {
      firstName: '',
      lastName: '',
    };
  },
  mixins: [FormMixin],
  watch: {
    model(oldVal, newVal) {
      this.$emit('input', newVal);
    },
    firstName(newVal) {
      this.$emit('updateForm', { firstName: newVal });
    },
    lastName(newVal) {
      this.$emit('updateForm', { lastName: newVal });
    },
  },
};
</script>
