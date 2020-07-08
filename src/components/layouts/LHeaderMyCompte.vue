<template>
  <div class="lHeaderMyCompte">
    <a-user-picture @click.native="$router.push({ name : 'MyInformations' })" v-if="hasUserPicto" >{{$props.name[0]}}</a-user-picture>
    <img @click="$router.push({ name : 'Home' })" class="logo" src="/logo.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'lHeaderMyCompte',
  props: {
    name: {
      default: '',
    },
  },
  computed: {
    hasUserPicto() {
      return this.$route.meta.userPicto;
    },
  },
};
</script>
<style lang="scss" scoped>
.lHeaderMyCompte {
  padding: 10px;
  height: 70px;
  display: flex;
  position: relative;
  .logo {
    display: block;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

::v-deep .wrapperprofilPicture {
  transform: scale(0.7);
  align-self: center;
}
</style>
