<template>
  <l-form-myacount backgroundColor="$gray-background">
    <a-button @click.native="$router.go(-3)" background="white" :hasSecondaryBackground="false" class="buttonBack" color="$primary-color"> <a-icone-back-arrow /> </a-button>
    <p v-if="type === 'ajouter'">Avoir des contacts vous permet d’effectuer des transactions monétaires plus rapidement</p>
    <ValidationObserver>
      <ValidationProvider name="id" rules="required|min:3" v-slot="{ errors }">
        <m-input v-if="type !== 'modifier'" v-model="accountNumber" :errors="errors" name="identifiant" exemple="AC14FG">Identifiant</m-input>
        <div class="confirmMessage" ref="confirmMessage" v-else>
          Voulez vous vraiment supprimer <strong>{{name}}</strong> <br>de la liste de vos contacts ?
        </div>
      </ValidationProvider>
    </ValidationObserver>
    <div class="wrapperButtons">
      <span  v-if="type !== 'modifier'" ><a-button :onload="formOnload" @click.native="putContact()" width="100%">Enregistrer</a-button></span>
      <span v-else ><a-button @click.native="removeContact()" :onload="formOnload" width="100%" background="$secondary-color">Oui</a-button></span>
    </div>
  </l-form-myacount>
</template>

<script>
export default {
  data() {
    return {
      formOnload: false,
      accountNumber: '',
    };
  },
  methods: {
    putContact() {
      this.formOnload = true;
      this.$Api.putContact({ accountNumberId: this.accountNumber }).then(() => {
        this.$router.go(-1);
      });
    },
    removeContact() {
      this.formOnload = true;
      this.$Api.removeContact(this.id).then(() => {
        this.$router.go(-3);
      });
    },
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    name() {
      return this.$route.query.name;
    },
    id() {
      return this.$route.query.id;
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .aButton {
//   margin: 20px 0px;
// }

.confirmMessage {
  text-align: center;
  padding: 30px;
}
.buttonBack {
  width: auto;
}
.wrapperButtons span {
  margin: 20px 0px;
}
</style>
