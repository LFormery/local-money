const FormMixin = {
  created() {
    const { initFormData } = this;
    /* eslint-disable */
    for (const payloadKey in initFormData) {
      this[payloadKey] = initFormData[`${payloadKey}`]
      
      // console.log( this[payloadKey] , initFormData[`${payloadKey}`])
    }
    // console.log(initFormData)
    /* eslint-enable */
  },
  props: {
    initFormData: {
      type: Object,
      default: {},
    },
  },
  watch: {
    model(newVal) {
      this.$emit('input', newVal);
    },
  },
};

export default FormMixin;
