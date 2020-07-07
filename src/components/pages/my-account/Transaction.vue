<template>
  <div>
    <l-overlay @clickOutSide="closePopPin()" :isActive="popinsOpen">
      <div class="validationMessageContainer">
        <l-wrapper-block backgroundColor="#F5F5F5">
          <div class="messageConfirmation">
            <p ref="messagePoppin"></p>
          </div>
          <template v-slot:bottom>
            <a-button
              v-show="!trasactionError"
              :onload="transactionOnload"
              @click.native="submitForm()"
              width="100%"
            >OUI</a-button>
            <a-button
              v-show="!transactionOnload && !trasactionError"
              @click.native="closePopPin()"
              background="white"
              color="$primary-color"
              width="100%"
            >NON</a-button>
            <a-button
              v-show="!transactionOnload && trasactionError"
              @click.native="$router.push({ name : 'MyTransaction'}); popinsOpen = false"
              width="100%"
            >Revenir plus tard</a-button>
          </template>
        </l-wrapper-block>
      </div>
    </l-overlay>

    <a-switch-button
      name="switch__page__transaction"
      @updateOption="(option) => { updatedMode(option) }"
       v-model="mode"
      :leftText="switchButton.leftText"
      :rightText="switchButton.rightText"
    />

    <ValidationObserver v-slot="{ valid }">
      <l-form-myacount @formSubmit="submit(valid)" boxShadow="none" backgroundColor="$gray-background">
        <template>
          <a-button
            :hasSecondaryBackground="false"
            v-if="canGoToPreviousPage"
            @click.native="goToPreviousPage()"
            background="white"
            color="$primary-color"
          >
            <a-icone-back-arrow />
          </a-button>
          <router-view
            :initFormData="{...formDatas}"
            @updateForm="( formData ) => { updateForm(formData) }"
            @updateFormValid="(val) => {formValid = val}"
            :childreOnLoad="childreOnLoad"
          />
        </template>
        <template v-slot:bottom>
          <div class="buttonWrapper">
            <a-button type="submit" :onload="childreOnLoad" width="100%">Suivant</a-button>
          </div>
        </template>
      </l-form-myacount>
    </ValidationObserver>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      formDatas: {},
      trasactionError: false,
      transactionOnload: false,
      childreOnLoad: false,
      mode: this.$route.name,
      type: '',
      popinsOpen: false,
      switchButton: {
        leftText: {
          text: 'Payer',
          value: 'Buy',
        },
        rightText: {
          text: 'Convertir',
          value: 'ConvertMoney',
        },
      },
    };
  },
  watch: {
    $route(to) {
      if (to.name === 'ConvertMoney' || to.name === 'Buy') {
        this.mode = to.name;
      }
    },
    mode(newVal) {
      if (newVal === 'ConvertMoney' || newVal === 'Buy') {
        this.$router.push({ name: newVal }).catch(() => {});
      }
    },
  },

  methods: {
    updateForm(curentFormData) {
      this.formDatas = {
        ...this.formDatas,
        ...curentFormData,
      };
    },
    formatForm(date) {
      const newDate = date.replace(/-/g, '/').slice();
      return `${newDate.slice(5)}/${newDate.slice(0, 2)}`;
    },
    updatedMode(option) {
      this.$router.push({ name: option });
    },
    goToPreviousPage() {
      this.$router.go(-1);
    },

    closePopPin() {
      if (!this.transactionOnload) {
        this.popinsOpen = false;
      }
    },
    putErroPoppin() {
      this.$refs.messagePoppin.innerHTML = 'une erreure ses produite veuillez réessayer plus tard 😔';
      this.trasactionError = true;
      this.transactionOnload = false;
    },
    putSuccessPoppin() {
      this.$store.dispatch(
        'setConfirmPageMessage',
        'Votre transaction à bien été faite',
      );
      this.$router.push({ name: 'Confirmation' });
      this.transactionOnload = false;
    },

    submitBuy() {
      this.transactionOnload = true;
      this.$Api
        .putTransferMoney(this.formDatas)
        .then(() => {
          this.putSuccessPoppin();
        })
        .catch(() => {
          console.log('ok');
          this.putErroPoppin();
        });
    },

    submitForm() {
      if (!this.transactionOnload) {
        if (this.mode === 'Buy') {
          this.submitBuy();
        } else if (this.mode === 'ConvertMoney') {
          this.convert();
        }
      }
    },

    convert() {
      this.transactionOnload = true;
      this.$Api
        .getLocalMoney({ transfered_money: this.formDatas.transfered_money })
        .then(() => {
          this.putSuccessPoppin();
        })
        .catch(() => {
          this.putErroPoppin();
        });
    },

    validationCovertion() {
      this.childreOnLoad = true;
      this.$Api.checkCreditCard({ numbers_card: this.formDatas.numbers_card, date: this.formatForm(this.formDatas.date), cvc: this.formDatas.cvc }).then(() => {
        this.$refs.messagePoppin.innerHTML = `Êtes-vous sûr de vouloir changer ${this.formDatas.transfered_money} €, en ${this.formDatas.transfered_money} MCL. Sachez que la reconversion vers l'euro ne sera pas possible.`;
        this.popinsOpen = true;
        this.childreOnLoad = false;
      }).catch(() => {
        this.$refs.messagePoppin.innerHTML = "Votre carte bancaire n'est pas valide veuillez contacter votre gouvenance pour plus de détails";
        this.popinsOpen = true;
        this.childreOnLoad = false;
        this.trasactionError = true;
      });
    },

    validationBuy() {
      this.$refs.messagePoppin.innerHTML = 'Êtes-vous sûr de vouloir envoyer {{transferedMoney}} MLC, au bénéficier  ?';
      this.popinsOpen = true;
    },

    submit(valid) {
      if (valid) {
        if (this.nextName) {
          this.$router.push({ name: this.nextName });
        } else if (this.mode === 'Buy') {
          this.validationBuy();
        } else if (this.mode === 'ConvertMoney') {
          this.validationCovertion();
        }
      }
    },

  },
  computed: {
    ...mapGetters(['transferId']),
    transferedMoney() {
      return this.formDatas && this.formDatas.transferedMoney;
    },
    beneficiaryAccountId() {
      return this.formDatas && this.formDatas.beneficiaryAccountId;
    },
    canGoToPreviousPage() {
      return this.$route.name !== 'ConvertMoney' && this.$route.name !== 'Buy';
    },
    nextName() {
      return this.$route.meta.nextName;
    },
    currentPopPin() {
      return this.popins[this.mode];
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .overlayContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0px;
}
.validationMessageContainer {
  min-width: 300px;
  margin: auto;
  height: 100%;
  max-height: 373px;
  z-index: 0;
  .messageConfirmation {
    display: flex;
    align-items: center;
    margin: auto;
    height: 62%;
  }
}

::v-deep .wrapperBlock {
  height: 100%;
  max-width: 80vw;
}

::v-deep .buttonSwitch {
  margin: 0 auto;
}

.buttonWrapper {
  padding-top: 90px;
  padding-bottom: 20px;
}
</style>
