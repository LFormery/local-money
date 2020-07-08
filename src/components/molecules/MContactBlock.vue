<template>
  <div class="mContactBlock">
    <p>{{fullName || name}} <br><span class="type">{{type}}</span></p>
    <a-icone-remove @click.native="$emit('clickRemove')"/>
  </div>
</template>

<script>

import AIconeRemove from '@/components/atoms/Icones/AIconeRemove.vue';

export default {
  name: 'MContactBlock',
  props: {
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
