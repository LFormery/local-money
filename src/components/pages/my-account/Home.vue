<template>
  <div class="home">

    <HeaderInformation :name="userInfomations.first_name">
      <template v-slot:mainText>
        Bonjour
        <span class="name">{{ userInfomations.first_name }}</span>
      </template>
      <template v-slot:subText>Bienvenue sur votre espace 😁 !</template>
    </HeaderInformation>

    <m-my-money></m-my-money>
    <l-wrapper-block>
      <template v-slot:title > Mes dernières transactions</template>
      <m-card-transaction
        v-for="(transaction, index) in lastTrasacton"
        :key="index"
        :name="transaction.beneficiary_name"
        :date="transaction.date"
        :sum="transaction.transfered_money"
        :statusTransactionUser="transaction.status_transaction_user"

      ></m-card-transaction>
      <template v-slot:bottom ><a-link class="link" @click.native="$router.push({name : 'MyTransaction'})">Voir toutes mes transactions</a-link> </template>
    </l-wrapper-block>
    <l-wrapper-block>
      <template v-slot:title >Mes commerçants préférés</template>
        <m-card-post v-for="(post, index) in lastPost" :key="'last_post' + index" :Numberlikes="post.likes" :idOfPost="post.post_id" :isLiked="post.liked" >
          <template v-slot:header > {{ post.title }} </template>
          <template v-slot:main > {{ post.content }} </template>
        </m-card-post>
        <template v-slot:bottom ><a-link class="link" @click.native="$router.push({name : 'Community'})">Voir le reste des actualitées</a-link> </template>
    </l-wrapper-block>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import HeaderInformation from '../../molecules/MHeaderInformation.vue';

export default {
  name: 'Home',
  data() {
    return {
      lastNumber: 4,
    };
  },
  components: {
    HeaderInformation,
  },
  created() {
    this.$Api.getCompanyPost().then((response) => { this.companyPost = response; });
    this.$Api.getMyTransaction()
      .then((response) => response);
  },
  computed: {
    ...mapGetters([
      'transactions',
      'companyPosts',
      'userInfomations',
    ]),
    lastTrasacton() {
      const lastTransaction = [];
      this.transactions.forEach((transactionsGroup) => {
        if (lastTransaction.length < this.lastNumber) {
          transactionsGroup.transaction.forEach((transaction) => {
            if (lastTransaction.length < this.lastNumber) {
              lastTransaction.push({ ...transaction, date: transactionsGroup.date });
            }
          });
        }
      });
      return lastTransaction;
    },

    lastPost() {
      const lastPost = [];
      for (let i = 0; i < this.lastNumber; i++) {
        if (this.companyPosts[i]) {
          lastPost.push(this.companyPosts[i]);
        }
      }
      return lastPost;
    },
  },
};
</script>

<style lang="scss" scoped>

::v-deep .picto {
  margin-right: 10px ;
}

.link {
  margin: 3 auto;
  display: block;
  text-align: center;
}
</style>
