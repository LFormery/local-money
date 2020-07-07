<template>
  <div class="mContactBlock">
    <span>{{$props.contactName}}</span>
    <a-icone-modify @click.native="$emit('clickRemove')"/>
  </div>
</template>

<script>

export default {
  name: 'MContactBlock',
  props: {
    contactName: {
      default: '',
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
