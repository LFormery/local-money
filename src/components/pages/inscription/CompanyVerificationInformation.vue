<template>
  <ValidationObserver ref="observer">
    <div class="mt-10">
      <ValidationProvider name="siret" rules="required|min:16|max:16"  v-slot="{ errors }">
        <m-input :errors="errors" name="siret"  type="tel" mask="### ### ### ####"  maxlength="16" v-model="siret" exemple="362 521 879 00034">siret</m-input>
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
      siret: '',
    };
  },
  mixins: [FormMixin],
  watch: {
    siret(newVal) {
      this.$emit('updateForm', { siret: newVal });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
