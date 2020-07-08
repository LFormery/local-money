<template>
  <div>
    <l-overlay @clickOutSide="closePopPin()" :isActive="popinsOpen">
      <div class="validationMessageContainer">
        <l-wrapper-block backgroundColor="#F5F5F5">
          <div class="messageConfirmation">
            <p
              ref="messagePoppin"
            >Êtes-vous sûr de vouloir {{transferedMoney}} MLC, à {{beneficiaryAccountId}} ( {nom du bénéficiaire} ) ?</p>
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
              @click.native="$router.push({ name : 'MyTransaction'})"
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
          />
        </template>
        <template v-slot:bottom>
          <div class="buttonWrapper">
            <a-button type="submit" width="100%">Suivant</a-button>
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
      mode: this.$route.name,
      type: '',
      popins: {
        Buy: {
          state: false,
        },
        ConvertMoney: {
          state: false,
        },
      },
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
        console.log(this.mode);
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
    updatedMode(option) {
      this.$router.push({ name: option });
    },
    goToPreviousPage() {
      this.$router.go(-1);
    },
    submit(valid) {
      if (valid) {
        if (this.nextName) {
          this.$router.push({ name: this.nextName });
        } else {
          this.popins[this.mode].state = true;
        }
      }
    },
    closePopPin() {
      if (!this.transactionOnload) {
        this.popins[this.mode].state = false;
      }
    },
    submitForm() {
      this.formDatas.emiterAccountId = `${this.transferId}`;
      if (!this.transactionOnload) {
        this.transactionOnload = true;
        this.$Api
          .putTransferMoney(this.formDatas)
          .then(() => {
            this.$store.dispatch(
              'setConfirmPageMessage',
              'Votre transaction à bien été faite',
            );
            this.$router.push({ name: 'Confirmation' });
            this.transactionOnload = false;
          })
          .catch(() => {
            this.$refs.messagePoppin.innerHTML = 'une erreure ses produite veuillez réessayer plus tard 😔';
            this.trasactionError = true;
            this.transactionOnload = false;
          });
      }
    },
<<<<<<< HEAD
=======

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
      const { transfered_money, numbers_card, cvc } = this.formDatas;  // eslint-disable-line
      const date = this.formatForm(this.formDatas.date);
      this.$Api.checkCreditCard({
        transfered_money, numbers_card, date, cvc,
      }).then(() => {
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
      const { transfered_money, beneficiaryAccountNumber } = this.formDatas;  // eslint-disable-line
      this.$refs.messagePoppin.innerHTML = `Êtes-vous sûr de vouloir envoyer ${transfered_money} MLC, au bénéficier ${beneficiaryAccountNumber} ?`;// eslint-disable-line
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

>>>>>>> develop
  },
  computed: {
    ...mapGetters(['transferId']),
    transferedMoney() {
      return this.formDatas && this.formDatas.transferedMoney;
    },
    beneficiaryAccountNumber() {
      return this.formDatas && this.formDatas.beneficiaryAccountNumber;
    },
    canGoToPreviousPage() {
      return this.$route.name !== 'ConvertMoney' && this.$route.name !== 'Buy';
    },
    nextName() {
      return this.$route.meta.nextName;
    },
    popinsOpen() {
      return (
        (this.popins.Buy && this.popins.Buy.state)
        || (this.popins.ConvertMoney && this.popins.ConvertMoney.state)
      );
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
