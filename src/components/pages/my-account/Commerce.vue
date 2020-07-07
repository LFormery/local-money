<template>
  <div>
    <!-- <ActualityFilter :filters="filtersArray">
      <template> Les entreprises du réseaux  </template>
    </ActualityFilter> -->
    <l-wrapper-block>
      <m-card-post :hasFooter="false" v-for="(company, index) in companiesList" :key="index"  >
        <template v-slot:header> {{ company.company_name }} </template>
        <template v-slot:main> Deescription: {{ company.category }} de {{ company.first_name }}</template>
      </m-card-post>
    </l-wrapper-block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import ActualityFilter from '../../molecules/MActualityFilter.vue';

export default {
  name: 'Commerce',
  components: {
    // ActualityFilter,
  },
  computed: {
    ...mapGetters([
      'companiesList',
    ]),
  },
  data() {
    return {
      filtersArray: [
        { text: 'Tous' },
        { text: 'Fournisseurs' },
        { text: 'Commerçants' },
        { text: 'Favoris' },
      ],
    };
  },
  mounted() {
    this.$Api.getCompanyList().then(() => { });
  },
};
</script>
