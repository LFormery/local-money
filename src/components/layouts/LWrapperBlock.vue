<template>
  <div class="wrapperBlock" :style="{ 'box-shadow' : $props.boxShadow ,'background-color' : currentBackgroundColor  }">
    <p>
      <slot class="title" name="title"></slot>
    </p>
    <slot></slot>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: 'WrapperBlock',
  props: {
    backgroundColor: {
      default: 'white',
    },
    boxShadow: {
      default: '0px 0px 20px rgba(0, 0, 0, 0.10)',
    },
  },
  computed: {
    currentBackgroundColor() {
      return this.$styleGuild.find(this.$props.backgroundColor);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapperBlock {
  border-radius: 35px;
  padding: 40px 25px;
  padding-top: 47px;
  margin: 10px 0px;

  .title {
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>
