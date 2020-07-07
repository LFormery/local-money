<template>
  <ValidationObserver v-slot="{ validate, valid }">
    <div>
      <p class="title">Laisser de mes nouvelles</p>
      <l-form-myacount @formSubmit="validate(); putCompanyPost(valid)">
        <ValidationProvider name="messages" rules="required|min:10|max:250" v-slot="{errors}">
          <div>
            <m-textarea
              v-model="companyPost"
              maxlength="250"
              :errors="errors"
              name="sendPost"
            >Votre message</m-textarea>
          </div>
        </ValidationProvider>
        <template v-slot:bottom>
          <a-button :onload="formOnload" type="submit" width="100%">Poster ce message</a-button>
        </template>
      </l-form-myacount>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SendPOst',
  data() {
    return {
      companyPost: '',
      formOnload: false,
    };
  },
  computed: {
    ...mapGetters(['userFirstName', 'userId']),
  },
  mounted() {},
  methods: {
    putCompanyPost(valid) {
      if (!this.formOnload && valid) {
        this.formOnload = true;
        this.$Api
          .putPost({
            title: 'title',
            content: this.companyPost,
          })
          .then(() => {
            this.formOnload = false;
            this.$store.dispatch(
              'setConfirmPageMessage',
              'Votre poste à bien été fait',
            );
            this.$router.push({ name: 'Confirmation' });
          })
          .catch(() => {
            this.formOnload = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  @include title;
}
::v-deep .MInput {
  textarea {
    height: 278px;
  }
}
</style>
