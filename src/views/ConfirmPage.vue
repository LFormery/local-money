<template>
  <div class="confirmPage">
    <p class="confirmText">{{confirmPageMessage}}</p>
    <div class="wrapperButton">
      <a-button @click.native="$router.push({ name : 'Home'})" width="100%">Suivant</a-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'confirmPageMessage',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.confirmPage {
  background-color: $gray-background;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .confirmText {
    margin: 200px auto;
    display: block;
  }
  .wrapperButton {
    width: 70%;
    margin: 0 auto;
    padding: 0 0px;
  }
}
</style>
