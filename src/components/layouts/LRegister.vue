<template>
  <div class="registerInscription">
    <img class="logo" src="/logo.svg" alt="">
    <div class="wrapperConnexion">
      <!-- SLOT HEADER -->
      <div class="header">
        <slot name="header"></slot>
      </div>
      <form v-on:submit.prevent="submit()">
        <!-- SLOT DEFAULT -->
        <div class="main">
          <slot></slot>
        </div>
        <!-- SLOT BOTTOM -->
        <slot name="bottom"></slot>
      </form>
    </div>

  </div>
</template>
<script>
export default {
  name: 'LRegister',
  methods: {
    submit() {
      this.$emit('formSubmit');
    },
  },
};
</script>

<style lang="scss" scoped>
.registerInscription {
  min-height: 100vh;
  background: url("../../assets/img/background-register.png");
  padding-top: 21vh;
  background-size: contain;
  background-position-y: -13%;
  background-repeat: no-repeat;
  .logo {
    position: absolute;
    display: block;
    margin: auto;
    top: 7%;
    right: 0px;
    left: 0px;
    height: 100px;
  }

  .main {
    min-height: 40vh;
  }
  .wrapperConnexion {
    z-index: 40;
    min-height: 75vh;
    height: 100%;
    background: #F9F9F9;
    border-radius: 35px 35px 0px 0px;
    padding: 30px 32px;
  }
}
</style>
