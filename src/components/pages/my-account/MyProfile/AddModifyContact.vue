<template>
  <l-form-myacount backgroundColor="$gray-background">
    <a-button @click.native="$router.go(-1)" background="white" :hasSecondaryBackground="false" color="$primary-color"> <a-icone-back-arrow /> </a-button>
    <p v-if="type === 'ajouter'">Avoir des contacts vous permet d’effectuer des transactions monétaires plus rapidement</p>
    <ValidationObserver>
      <ValidationProvider name="id" rules="required|min:3" v-slot="{ errors }">
        <m-input v-model="accountId" :errors="errors" name="identifiant" exemple="AC14FG">Identifiant</m-input>
      </ValidationProvider>
    </ValidationObserver>
    <div class="wrapperButtons">
      <span><a-button width="100%">Enregistrer</a-button></span>
      <span><a-button v-if="type === 'modifier'" width="100%" background="$secondary-color">Supprimer</a-button></span>
    </div>
  </l-form-myacount>
</template>

<script>
export default {
  data() {
    return {
      name: this.$route.query.name || '',
      accountId: this.$route.query.id || '',
    };
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .aButton {
//   margin: 20px 0px;
// }

.wrapperButtons span {
  margin: 20px 0px;
}
</style>
