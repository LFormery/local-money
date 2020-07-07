<template>
<button :type="type" class="aButtonWrapper">
  <span v-if="hasSecondaryBackground" class="backgroundButton" :style="{background : buttonStyle.background}"></span>
  <button class="aButton" :style="buttonStyle" :type="type">
    <span v-if="!onload">
      <slot></slot>
    </span>
    <span>
      <svg
      class="loader"
      v-if="onload"
      width="40px"
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
      >
        <path
          fill="#fff"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
  </button>
</button>

</template>

<script>
export default {
  name: 'AButton',
  computed: {
    buttonStyle() {
      return {
        color: this.$styleGuild.find(this.$props.color),
        background: this.$styleGuild.find(this.$props.background),
        width: this.$styleGuild.find(this.$props.width),
      };
    },
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    hasSecondaryBackground: {
      default: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    color: {
      type: String,
      default: '#fefefe',
    },
    background: {
      type: String,
      default: '#189b73',
    },
    width: {
      type: String,
      default: '',
    },
    onload: {
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.aButtonWrapper {
  position: relative;
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
}

.aButton {
  padding: 15px 20px;
  border: 30px;
  color: white;
  background: $primary-color;
  display: table;
  border-radius: 15px;
  margin: 5px 0px;
  z-index: 3;
  position: relative;
  &:focus {
    outline: none;
  }
  .loader {
    margin: auto;
    margin: -15px auto;
  }
  &__background {
    position: relative;
    width: 100%;
  }
}
.backgroundButton {
  width: 100%;
  height: 40px;
  display: block;
  position: absolute;
  bottom: 0px;
  background: black;
  opacity: 0.6;
  border-radius: 15px;
}
</style>
