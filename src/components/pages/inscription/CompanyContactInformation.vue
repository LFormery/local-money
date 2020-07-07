<template>
  <ValidationObserver ref="observer">
    <div>
      <ValidationProvider name="Nom" rules="required|alpha_dash|min:3" v-slot="{ errors }">
        <m-input :errors="errors" name="first_name" v-model="firstName" exemple="Guilloux">Nom</m-input>
      </ValidationProvider>
      <ValidationProvider name="prenom" rules="required|min:3" v-slot="{ errors }">
        <m-input v-model="lastName" name="last_name" :errors="errors" exemple="Brontis" class="mt-4">Prenom</m-input>
      </ValidationProvider>
      <ValidationProvider name="age" rules="required|min:10|majority" v-slot="{ errors }">
        <m-input :errors="errors" name="date_of_birth" type="date" v-model="birthDay" maxlength="8" exemple="30/09/1998">Age</m-input>
      </ValidationProvider>
      <ValidationProvider name="numéro de téléphone" rules="required|min:3" v-slot="{ errors }">
        <m-input :errors="errors" name="tel" type="tel" v-model="phoneNumber" mask="## ## ## ## ##" maxlength="14" exemple="06 21 48 37 99">Téléphone</m-input>
      </ValidationProvider>
      <ValidationProvider name="mail" rules="email|required" v-slot="{ errors }">
        <m-input :errors="errors" name="mail" v-model="email" type="mail" exemple="marie.jane@mail.com">
          Email
        </m-input>
      </ValidationProvider>
      <ValidationProvider name="mot de passe" rules="required|min:6" v-slot="{ errors }">
          <m-input type="password" name="password" v-model="password" :errors="errors" exemple="*********">
            Mot de passe
          </m-input>
      </ValidationProvider>
    </div>
  </ValidationObserver>
</template>
<script>

import FormMixin from '@/mixins/formMixin';

export default {
  name: 'InformationContact',
  data() {
    return {
      firstName: '',
      lastName: '',
      birthDay: '',
      phoneNumber: '',
      email: '',
      password: '',
    };
  },
  mixins: [FormMixin],
  watch: {
    model(newVal) {
      this.$emit('input', newVal);
    },
    firstName(newVal) {
      this.$emit('updateForm', { firstName: newVal });
    },
    lastName(newVal) {
      this.$emit('updateForm', { lastName: newVal });
    },
    birthDay(newVal) {
      this.$emit('updateForm', { birthDay: newVal });
    },
    phoneNumber(newVal) {
      this.$emit('updateForm', { phoneNumber: newVal });
    },
    email(newVal) {
      this.$emit('updateForm', { email: newVal });
    },
    password(newVal) {
      this.$emit('updateForm', { password: newVal });
    },
  },
};
</script>
