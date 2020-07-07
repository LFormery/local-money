<template>
  <div class="OTransactionInut">
    <m-input :name="name" :errors="errors" :label="label" v-model="model" type="tel"></m-input>
  </div>
</template>

<script>
export default {
  name: 'OTransactionInut',
  data() {
    return {
      model: this.$attrs.value || '',
    };
  },
  watch: {
    model(newVal) {
      this.$emit('input', newVal);
    },
  },
  props: {
    name: {},
    errors: {},
    label: {
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>

::v-deep .MInput {
  .wrapperInputLabel {
    display: flex;
    flex-direction: row-reverse;
    label {
      font-size: 40px;
      color: black;
      font-weight: 600;
    }
    input {
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
  }
  .errorMessage {
    display: block;
    padding-top: 10px;
  }
}

.OTransactionInut {
  border-bottom: solid 1px #F2A379;
  color: rgb(41, 41, 41);
  background: transparent;
  width: 100%;
  max-width: 370px;
  font-size: 40px;
  height: 60px;
}
</style>
