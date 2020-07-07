<template>
  <span class="ASelect">
    <select v-model="model">
      <option disabled>{{fallback}}</option>
      <option
        v-for="(element, index) in list"
        :key="'gouvernance_'+index"
        :value="element.value">
        {{element.option}}
      </option>
    </select>
    <span class="errorMessage">{{errors[0]}}</span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      model: this.$attrs.value,
    };
  },
  props: {
    fallback: {
      default: '',
    },
    list: {
      default: [],
    },
    errors: {
      default: '',
    },
  },
  watch: {
    model(newVal) {
      this.$emit('input', newVal);
    },
  },
  '$attrs.value': function (newVal, oldVal) {
    if (newVal !== oldVal) {
      this.model = newVal;
    }
  },
};
</script>

<style lang="scss" scoped>
select {
  background: #ffffff;
  height: 50px;
  border: 2px solid #9ebab1b6;
  padding: 0px 20px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

.errorMessage {
  color: #ff3b3b;
  font-size: 16px;
}
</style>
