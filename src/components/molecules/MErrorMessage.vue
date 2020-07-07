<template>
  <div class="MerrorMessage">
    <p>Erreur</p>
    <p>{{errorMessage}}</p>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: "une erreur s'est produite veuillez réessayer plus tard",
    },
  },
  computed: {
    errorMessage() {
      return this.$props.message ? this.$props.message : "une erreur s'est produite veuillez réessayer plus tard";
    },
  },
};
</script>
<style lang="scss" scoped>

.MerrorMessage {
  position: absolute;
  background: rgba(255, 255, 255, 0.856);
  padding: 20px;
  z-index: 2;
  font-size: 16px;
  padding-left: 30px;
  margin: auto;
  width: 300px;
  left: 0px;
  right: 0px;

  :nth-child(1) {
    font-size: 16px 20px;
    font-weight: 700;
  }
  :nth-child(2) {
    color: #7C7E7E;
  }
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 20px;
    background-color: $secondary-color;
    position: absolute;
    left: 0px;
    top: 0px;
  }
}

</style>
