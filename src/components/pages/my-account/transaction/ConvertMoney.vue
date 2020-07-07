<template>
  <ValidationObserver ref="observer">
    <div>
      <p>Mon solde : {{solde}} MCL</p>
      <p>Je souhaite acquérir :</p>
      <div class="fieldConvert">
        <ValidationProvider>
          <o-transaction-input
            v-model="transfered_money"
            :label="label"
            :errors="{}"
            name="sum_to_send"
          />
        </ValidationProvider>
        <a-button
          class="convertButton"
          @click.native="switchMode()"
          background="white"
          :hasSecondaryBackground="false"
          v-if="compteType === 'company'"
        >
          <a-icone-conver />
        </a-button>
      </div>
      <div v-if="transfered_money" class="bottom">
        <p v-if="mode === 'local'">en euro {{transfered_money}} €</p>
        <p v-else>en monnaie locale {{transfered_money}} mlc</p>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
import { mapGetters } from 'vuex';
import formMixin from '@/mixins/formMixin';
import AiconvertArrow from '@/components/atoms/Icones/AiconeConvert.vue';

export default {
  data() {
    return {
      mode: 'local',
      transfered_money: '',
    };
  },
  components: {
    'a-icone-conver': AiconvertArrow,
  },

  watch: {
    transfered_money(newVal) {
      this.$emit('updateForm', { transfered_money: newVal });
    },
  },
  methods: {
    switchMode() {
      console.log(this.mode);
      this.mode = this.mode === 'local' ? 'euro' : 'local';
    },
  },
  computed: {
    ...mapGetters(['solde', 'userInfomations']),
    label() {
      return this.mode === 'local' ? 'MLC' : '€';
    },
    compteType() {
      return this.userInfomations.type;
    },
  },
  mixins: [formMixin],
};
</script>
<style lang="scss" scoped>
.fieldConvert {
  display: flex;
  justify-content: space-between;
}
.convertButton {
  width: auto;
  margin-left: 30px;
  margin-top: 30px;
}
</style>
