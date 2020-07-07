<template>
  <l-regitster @formSubmit="toNextPage()">
    <template v-slot:header>
      <div class="header">
        <span>
          <a-button
            background="white"
            :hasSecondaryBackground="false"
            color="#189B73"
            @click.native="$router.go(-1)"
          >
            <a-icone-back-arrow />
          </a-button>
        </span>
        <div class="textInstruction">
          <p class="title">{{title}}</p>
          <p class="subText">{{subText}}</p>
        </div>
      </div>
    </template>
    <template>
      <router-view
        :toNextPage="toNextPage"
        :initFormData="{...formDatas}"
        @updateForm="( formData ) => { updateForm(formData) }"
      />
    </template>
    <template v-slot:bottom>
      <a-button
        width="100%"
        type="submit"
        :onload="buttonOnload"
        v-if="currentNamePage !=='AccountType'"
      >Suviant</a-button>
      <!-- <a-button
        width="100%"
        background="white"
        color="#189B73"
        v-if="!previousPath"
        @click.native="$router.push({ name: 'Register' })"
      >Se connecter</a-button> -->
    </template>
  </l-regitster>
</template>

<script>

export default {
  name: 'inscription',
  data() {
    return {
      formDatas: {
      },
      submitted: false,
      formValid: false,
      buttonOnload: false,
    };
  },
  mounted() {
    console.log(this.$router);
  },
  methods: {
    formatForm(payloadForm) {
      payloadForm = JSON.parse(JSON.stringify(payloadForm));
      if (payloadForm.birthdate) {
        payloadForm.birthdate = payloadForm.birthdate.replace(/-/g, '/');
      }
      return payloadForm;
    },
    toNextPage() {
      if (!this.pageSubmited) {
        const { nextPath } = this;
        const newPath = this.formDatas.type ? `${this.formDatas.type}-${nextPath}` : nextPath;
        this.$router.push({
          path: newPath,
        });

        this.formValid = false;
      } else {
        this.buttonOnload = true;
        this.$Api.postRegister(this.formatForm(this.formDatas))
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toPreviousPage() {
      this.$router.push({ path: this.previousPath });
    },
    updateForm(curentFormData) {
      this.formDatas = {
        ...this.formDatas,
        ...curentFormData,
      };
    },
  },
  computed: {
    pageSubmited() {
      return this.$route.meta.submit;
    },
    nextPath() {
      return this.$route.meta.nextPath;
    },
    previousPath() {
      return this.$route.meta.previousPath;
    },
    subText() {
      return this.$route.meta.subText;
    },
    currentNamePage() {
      return this.$route.name;
    },
    title() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  .textInstruction {
    padding-left: 10px ;
    .title {
      margin: auto;
      font-family: $secondary-font;
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 26px;
    }
    .subText {
      padding-top: 1px;
      font-size: 14px;
      font-weight: 600;
      color: $gray;
    }
  }
}

</style>
