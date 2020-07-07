<template>
  <div>
    <div class="containerButton">
      <a-button width="100%" type="submit" @click.native="$emit('updateForm', { type: 'company' }); toNextPage();" class="w-full company">Entreprise</a-button>
    </div>
    <div class="containerButton">
      <a-button width="100%" type="submit" @click.native="$emit('updateForm', { type: 'particular' }); toNextPage()" class="w-full particular" background="#DE6B48">Particulier</a-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TypeOfAccount',
  data() {
    return {
      gouvernanceList: [],
    };
  },
  props: {
    toNextPage: {
      type: Function,
    },
  },
  mounted() {
    this.$emit('updateFormValid', true);
  },
};
</script>

<style lang="scss" scoped>
.containerButton {
  padding: 10px 0px;
}
</style>
