<template>
  <ValidationObserver ref="observer">
    <div>
      <p>Mon solde : {{solde}} MCL</p>
      <p>Je souhaite acquérir :</p>
      <div class="fieldConvert">
        <ValidationProvider>
          <o-transaction-input
            v-model="transferedMoney"
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
        >
          <a-icone-conver />
        </a-button>
      </div>
      <div v-if="transferedMoney" class="bottom">
        <p v-if="mode === 'local'">en euro {{transferedMoney}} €</p>
        <p v-else>en monnaie locale {{transferedMoney}} mlc</p>
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
      transferedMoney: '',
    };
  },
  components: {
    'a-icone-conver': AiconvertArrow,
  },
  watch: {
    transferedMoney(newVal) {
      this.$emit('updateForm', { transferedMoney: newVal });
    },
  },
  methods: {
    switchMode() {
      console.log(this.mode);
      this.mode = this.mode === 'local' ? 'euro' : 'local';
    },
  },
  computed: {
    ...mapGetters(['solde']),
    label() {
      return this.mode === 'local' ? 'MLC' : '€';
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
