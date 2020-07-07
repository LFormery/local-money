<template>
  <section class="buttonSwitch">
    <span
      class="buttonSwitch__text buttonSwitch__text--right"
      :class="{'isActive' : $props.leftText.value === model}"
    >
      <label :for="$props.leftText.value">{{$props.leftText.text}}</label>
      <input
        type="radio"
        :id="$props.leftText.value"
        :name="name"
        :value="$props.leftText.value"
        v-model="model"
      />
    </span>
    <span
      class="buttonSwitch__text buttonSwitch__text--left"
      :class="{'isActive' : $props.rightText.value === model}"
    >
      <label :for="$props.rightText.value">{{$props.rightText.text}}</label>
      <input
        type="radio"
        :id="$props.rightText.value"
        :name="name"
        :value="$props.rightText.value"
        v-model="model"
      />
    </span>
  </section>
</template>

<script>
export default {
  name: 'buttonSwitch',
  data() {
    return {
      model: this.$attrs.value || '',
    };
  },
  props: {
    name: {
      default: 'switch',
    },
    leftText: {
      default: {
        text: '',
        value: '',
      },
    },
    rightText: {
      default: {
        text: '',
        value: '',
      },
    },
  },
  watch: {
    model(newVal) {
      this.$emit('input', newVal);
    },
    '$attrs.value': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.model = newVal;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonSwitch {
  display: flex;
  position: relative;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.07);
  border-radius: 15px;
  width: 60%;
  max-width: 375px;
  margin: auto;
  justify-content: space-evenly;
  background-color: rgba(255, 255, 255, 0.637);
  &__text {
    position: relative;
    margin: 20px;
    color : $primary-color-100;

    label {
      z-index: 10;
      position: relative;
      background: white;
      cursor: pointer;
      display: block;
    }

    &.isActive {
      label::after {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 6px;
        background: $primary-color-100;
        left: 0;
      }
    }

    input {
      margin: auto;
      display: block;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: 0;
      position: absolute;
    }
  }
}
</style>
