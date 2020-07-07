<template>
  <div>
    <l-wrapper-block backgroundColor="$gray-background">
      <div class="wrapperButton">
        <a-button @click.native="$router.push({ name : 'AddModifyContact', params: { type: 'ajouter' } })" width="100%" >Ajouter nouveau un contact</a-button>
      </div>
      <m-contact-block v-for="(contact, key) in contacts" :type="contact.type" :name="contact.name" :lastName="contact.lastName" :firstName="contact.firstName" @clickRemove="nextPage(contact)" :key="'contact_'+key" />
    </l-wrapper-block>
  </div>
</template>

<script>

export default {
  name: 'MyContacts',
  props: {
    contacts: {
      default: [],
    },
  },
  mounted() {
    this.$Api.getContacts();
  },
  methods: {
    getFullName(contact) {
      return contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.name;
    },
    nextPage(contact) {
      const fullName = this.getFullName(contact);
      this.$router.push({ name: 'AddModifyContact', params: { type: 'modifier', id: contact.account_id }, query: { id: contact.account_id, name: fullName } }).then((res) => {
        this.$router.push({ path: res.fullPath });
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.wrapperButton {
  padding-bottom: 10px;
}
</style>
