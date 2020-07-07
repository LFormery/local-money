<template>
  <m-card-post :hasFooter="false">
    <template v-slot:main>
      <!-- <a-button>Modifier mes informations</a-button> -->
      <h2 class="title">Mes informations</h2>
      <h3>Contact</h3>
        <p>{{userInfomations.number_phone}}</p>
        <p>{{userInfomations.address}}</p>
    </template>
  </m-card-post>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'myInformation',
  data() {
    return {
      myInformation: [
      ],
    };
  },
  mounted() {
    this.$Api.getUserInfo(this.$Api.token)
      .then((response) => {
        this.myInformation = response;
        console.log('je suis myInformation', this.myInformation);
      });
  },
  computed: {
    ...mapGetters([
      'userInfomations',
    ]),
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.title {
  // @include title;
  padding: 20px 0px;
}
  ul {
    list-style: none;
    li {
      font-weight: 400;
    }
  }
</style>
