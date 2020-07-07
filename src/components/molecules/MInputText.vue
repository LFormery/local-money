<template>
  <div class="MInput">
    <span class="wrapperInputLabel">
      <label :for="name">{{ label || placeholder}}</label>
      <input
        :id="name"
        ref="input"
        :name="name"
        :maxlength="maxlength"
        :rules="rules"
        value="model"
        :placeholder="exemple"
        v-model="model"
        :type="type"
      />
    </span>
    <span class="errorMessage">{{errors[0]}}</span>
  </div>
</template>

<script>
export default {
  name: 'MInput',
  data() {
    return {
      model: this.$attrs.value,
    };
  },
  props: {
    exemple: String,
    mask: {
      default: false,
    },
    rules: {
      type: String,
      default: '',
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
      default: '50',
    },
    disabled: {
      default: false,
    },
    label: {
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  watch: {
    model(newVal, oldVal) {
      const regex = new RegExp('[0-9]| ');

      if (newVal > oldVal) {
        if (
          this.mask
          && this.mask[newVal.length]
          && this.mask[newVal.length] !== '#'
        ) {
          this.model += this.mask[newVal.length];
        }
      }

      if (this.type === 'tel' && !regex.test(newVal[newVal.length - 1])) {
        this.model.slice(1);
        this.model = this.model.slice(0, this.model.length - 1);
        return;
      }

      this.$emit('input', newVal);
    },
  },
  '$attrs.value': function (newVal, oldVal) {
    console.log(newVal, oldVal);
    if (newVal !== oldVal) {
      this.model = newVal;
    }
  },
  computed: {
    placeholder() {
      return (
        this.$slots.default
        && this.$slots.default[0]
        && this.$slots.default[0].text
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.MInput {
  margin: 10px 0px;
}
label {
  @include labelInput;
}
input {
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
