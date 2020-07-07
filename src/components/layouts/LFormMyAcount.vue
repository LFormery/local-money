<template>
  <div
    class="LFormMyAcount"
    :style="{ 'box-shadow' : $props.boxShadow ,'background-color' : currentBackgroundColor  }"
  >
    <div class="header">
      <slot class="title" name="header"></slot>
    </div>
    <ValidationObserver ref="observer" v-slot="{ valid, validate }">
      <form action v-on:submit.prevent="submit(valid); validate()">
        <slot></slot>
        <slot name="bottom"></slot>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'LFormMyAcount',
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
.LFormMyAcount {
  border-radius: 35px;
  padding: 40px 25px;
  margin: 10px 0px;
}
</style>
