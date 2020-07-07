<template>
  <div  class="transaction">
    <a-picto  class="transactionElement--picto" type="default"/>
    <p class="transactionElement--name" >  {{$props.name}}</p>
    <p class="transactionElement--date">  {{$props.date}}</p>
    <p class="transactionElement--sum" :class="statusTransactionUser">  {{ fullTransactionValue }} </p>
  </div>
</template>

statusTransactionUser

<script>

export default {
  name: 'MCardTransaction',
  props: {
    name: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    sum: {
      type: String,
      default: '',
    },
    statusTransactionUser: {
      type: String,
      default: '',
    },
  },
  computed: {
    fullTransactionValue() {
      return this.statusTransactionUser === 'emiter' ? `- ${this.sum}` : `+ ${this.sum}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background: $gray-background;
  padding: 10px;
  max-width: 100%;
  border-radius: 20px;
  margin: 5px 0px;
  .transactionElement {
    &--picto {
      margin: auto;
      grid-area: 1 / 1 / 5 / 2
    }

    &--name {
      font-weight: bold;
      grid-area: 1 / 2 / 3 / 5;
    }

    &--date {
      grid-area: 3 / 2 / 5 / 5;
      font-weight: 300;
      color: rgb(39, 39, 39);
    }

    &--sum {
      font-weight: bold;
      grid-area: 2 / 5 / 4 / 6;
      &.emiter {
        color: #D16228;
      }
      &.beneficiary {
        color: #189B73
      }
    }
  }
}
</style>
