<template>
  <div class="registerInscription">
    <img class="logo" src="/logo.svg" alt />
    <div class="wrapperConnexion">

      <ValidationObserver ref="observer" v-slot="{ validate, valid }">
        <!-- SLOT HEADER -->
        <div class="header">
          <slot name="header"></slot>
        </div>
        <form v-on:submit.prevent="submit(valid); validate()">
          <!-- SLOT DEFAULT -->
          <div class="main" v-bind:valid="valid">
            <slot v-bind:validate="validate"></slot>
          </div>
          <!-- SLOT BOTTOM -->
          <slot name="bottom"></slot>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LRegister',
  methods: {
    submit(valid) {
      if (valid) {
        this.$emit('formSubmit');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.registerInscription {
  background: url("../../assets/img/background-register.png");
  padding-top: 25vh;
  background-size: contain;
  background-position-y: -8%;
  background-repeat: no-repeat;
  .logo {
    position: absolute;
    display: block;
    margin: auto;
    top: 7%;
    right: 0px;
    left: 0px;
    height: 60px;
  }

  .main {
    min-height: 40vh;
  }
  .wrapperConnexion {
    z-index: 40;
    min-height: 75vh;
    height: 100%;
    background: #f9f9f9;
    border-radius: 35px 35px 0px 0px;
    padding: 30px 32px;
  }
}
</style>
