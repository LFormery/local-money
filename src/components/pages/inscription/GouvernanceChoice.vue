<template>
  <ValidationProvider name="gouvernance" rules="required" v-slot="{errors}">
    <a-select
      fallback="Votre gouvernance"
      :list="optionGouvernanceList"
      :errors="errors"
      v-model="governanceId"
    />
  </ValidationProvider>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      governanceId: '',
    };
  },
  name: 'GouvernanceChoice',
  props: {
    toNextPage: {
      type: Function,
    },
  },
  watch: {
    governanceId(newVal) {
      this.$emit('updateForm', { governanceId: newVal });
    },
  },
  computed: {
    ...mapGetters(['gouvernanceList']),
    optionGouvernanceList() {
      return this.gouvernanceList.map((gouvernance) => ({
        option: gouvernance.governance_name,
        value: gouvernance.id,
      }));
    },
  },
  created() {
    this.$Api.getGouvernance();
  },
};
</script>

<style lang="scss" scoped>
.ASelect {
  margin-top: 30px;
  display: block;
}
</style>
