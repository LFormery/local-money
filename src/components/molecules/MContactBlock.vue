<template>
  <div class="mContactBlock">
<<<<<<< HEAD
    <span>{{$props.contactName}}</span>
    <a-icone-modify @click.native="$emit('clickRemove')"/>
=======
    <p>{{fullName || name}} <br><span class="type">{{type}}</span></p>
    <a-icone-remove @click.native="$emit('clickRemove')"/>
>>>>>>> develop
  </div>
</template>

<script>

import AIconeRemove from '@/components/atoms/Icones/AIconeRemove.vue';

export default {
  name: 'MContactBlock',
  props: {
<<<<<<< HEAD
    contactName: {
      default: '',
=======
    type: {},
    name: {},
    firstName: {},
    lastName: {},
  },
  components: {
    'a-icone-remove': AIconeRemove,
  },
  computed: {
    fullName() {
      return this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : this.name;
>>>>>>> develop
    },
  },
};

</script>

<style lang="scss" scoped>
.mContactBlock {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: white;
  border-radius: 10px;
}
</style>
