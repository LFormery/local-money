<template>
  <div class="landing">
    <header>
      <span>Logo</span>
      <div>
        <p>Soumettre une monnaie locale</p>
        <a-button>Acceder a la web App</a-button>
      </div>
      </header>
  </div>
</template>

<script>
export default {
  name: 'Landing',
};
</script>

<style lang="scss" scoped>
.landing {
  header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      display: flex;
    }
  }
}
</style>
