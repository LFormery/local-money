const FormMixin = {
  created() {
    const { initFormData } = this;
    /* eslint-disable */
    for (const payloadKey in initFormData) {
      this[payloadKey] = initFormData[`${payloadKey}`]
      
      console.log( this[payloadKey] , initFormData[`${payloadKey}`])
    }
    console.log(initFormData)
    /* eslint-enable */
  },
  methods: {
    validate() {
      this.$refs.observer.flags.validate();
    },
  },
  mounted() {
    this.$watch(() => this.$refs.observer.flags.valid, (val) => { this.$emit('updateFormValid', val); });
    if (this.$refs.observer.flags.valid) {
      this.$emit('updateFormValid', true);
    }
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
