<template>
  <div class="myMoney">
    <l-wrapper-block :style="{ background : background }" :boxShadow="boxShadow">
      <template v-slot:title >
      <p>Le solde de votre compte</p>
      </template>
      <p class="mySolde">{{solde}} MLC</p>
      <a-button  width="100%" @click.native="$router.push({ name : 'Buy' })" >Payer</a-button>
      <a-button v-if="convertir"  width="100%" @click.native="$router.push({ name : 'ConvertMoney' })" background="#D16228"> Convertir</a-button>
    </l-wrapper-block>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'MyMoney',
  data() {
    return {
      convertir: this.$props.convertMoney,
    };
  },
  props: {
    boxShadow: {
      default: '0px 0px 10px rgba(0, 0, 0, 0.25)',
    },
    background: { },
    convertMoney: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters([
      'solde',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .myMoney {
    p{
      font-weight: bold;
    }
    .mySolde{
      font-size: 50px;
    }
  }
</style>
