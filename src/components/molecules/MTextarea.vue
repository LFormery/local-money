<template>
  <div class="mTextarea">
    <label :for="name" class="px-1 text-sm text-gray-600">{{placeholder}}</label>
    <textarea :id="name" ref="input" :name="name" :maxlength="maxlength" :placeholder="exemple" v-model="model" />
    <span class="errorMessage">{{errors[0]}}</span>
  </div>
</template>

<script>
export default {
  name: 'mTextarea',
  data() {
    return {
      model: this.$attrs.value || '',
    };
  },
  props: {
    exemple: String,
    mask: {
      default: false,
    },
    errors: {
      default: [],
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    maxlength: {
      type: String,
      default: '250',
    },
  },
  watch: {
    model(newVal) {
      this.$emit('input', newVal);
    },
  },
  computed: {
    placeholder() {
      return this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text;
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  background: #FFFFFF;
  height: 360px;
  border: 2px solid #9ebab1b6;
  padding: 20px 20px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

label {
  @include labelInput;
}
.errorMessage {
  color: #ff3b3b;
}
</style>
