<template>
  <div v-if="favouriteList" class="content">
    <h2>{{ favouriteList.name }}</h2>
    <div class="wrapper">
      <List v-bind:items="favouriteList.items" v-bind:isEditable="false" v-bind:checkItem="checkItem" />
    </div>
  </div>
  <div v-else class="content">
    <h2>You don't have a favourite list  <img src="../assets/wow.png" /></h2>
    <p>Please create one on <router-link to="/new-list">NewList</router-link> page.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import List from '../components/List';
export default {
  name: 'ShoppingList',
  components: {
    List,
  },
  computed: mapState({
    favouriteList: state => {
      return state.favouriteList;
    },
  }),
  methods: {
    checkItem: function(item) {
      this.$store.commit({
        type: 'checkListItem',
        item,
        listId: this.favouriteList.id,
      })
    }
  },
}
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.content img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
h2 {
  display: flex;
  align-items: center;
  margin: 0 auto 40px;
}
.wrapper {
  margin: 0 auto;
}
</style>
