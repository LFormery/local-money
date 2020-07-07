<template>
<ValidationObserver>
  <m-error-message :message="errorMessage" v-show="error"/>
  <l-regitster @formSubmit="submitForm">
      <template v-slot:header>
        <p class="wellcomeMessage">Bienvenue <br class="v-min">sur NeyMo !</p>
        <p>Connectez vous pour continuer </p>
      </template>
      <template v-slot:default>
      <div class="mt-10">
        <ValidationProvider name="mail" rules="email|required" v-slot="{ errors }">
          <m-input :errors="errors" name="mail" v-model="mail" exemple="marie.jane@mail.com">
            Email
          </m-input>
        </ValidationProvider>
        <ValidationProvider name="mot de passe" rules="required|min:6" v-slot="{ errors }">
          <m-input type="password" name="password" v-model="password" :errors="errors" exemple="*********" class="mt-4">
            Mot de passe
          </m-input>
        </ValidationProvider>
      </div>
        <!-- <a-link class="block mx-auto my-2 mb-4 text-center">
          Mot de passe oublié ?
        </a-link> -->
        <div class="wrapperButton">
          <a-button :onload="formOnload" width="100%" type="submit">Se connecter</a-button>
          <a-button color="#189B73" background="#fefefe"  width="100%"  @click.native="$router.push({ path: 'inscription/choisissez-votre-monnaie' })">S’inscrire</a-button>
        </div>
      </template>
  </l-regitster>
</ValidationObserver>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      errorMessage: '',
      mail: '',
      password: '',
      formOnload: false,
    };
  },
  methods: {
    submitForm() {
      this.formOnload = true;

      this.$Api.login({
        username: this.mail,
        password: this.password,
      }).then(() => {
        this.$router.push({ name: 'Home' });
        this.formOnload = false;
      }).catch((error) => {
        if (error.code === 401) {
          this.errorMessage = 'vos identifiants sont incorrects.';
          this.error = true;
        }
        this.formOnload = false;
      });
    },
  },
  created() {
    this.$Api.get('/governances')
      .then((gouvernanceList) => {
        this.gouvernanceList = gouvernanceList;
      });
  },
};
</script>

<style lang="scss" scoped>

.MerrorMessage {
  top: 30px;
  transition: opacity 0.5s;
}

.wellcomeMessage {
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
  font-family: $secondary-font;
}

::v-deep .Alink {
  text-align: center;
  display: block;
  margin: 20px auto;
}
.wrapperButton {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

</style>
