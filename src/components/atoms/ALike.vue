<template>
  <div ref="like" class="likeHeart">
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.928 0.357636C22.8258 0.376613 25.981 3.53175 26 7.42966C26 14.571 13 21.643 13 21.643C13 21.643 0 14.467 0 7.42966C0 3.52392 3.16622 0.357636 7.07202 0.357636C9.46289 0.33899 11.6981 1.54153 13 3.54695C14.3109 1.55128 16.5403 0.351863 18.928 0.357636Z" fill="#D7443E"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Like',
  data() {
    return {
      state: {
        isLiked: {
          stroke: '#D7443E',
          fill: '#D7443E',
          strokeWidth: '1px',
        },
        isDisLiked: {
          stroke: '#D7443E',
          fill: 'white',
          strokeWidth: '1px',
        },
      },
    };
  },
  computed: {
    currentState() {
      return this.$props.isLiked ? this.state.isLiked : this.state.isDisLiked;
    },
  },

  mounted() {
    this.$anime.heartAnimation(this.$refs.like, this.currentState);
  },

  watch: {
    currentState(newState) {
      this.$anime.heartAnimation(this.$refs.like, newState);
    },
  },

  methods: {
  },
  props: {
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.likeHeart {
  margin-right: 20px;
  background-color: #fefefe;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

svg {
  overflow: inherit;
}
</style>
