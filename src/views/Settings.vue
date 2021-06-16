<template>
  <ListActionConfirmationModal
      v-if="modals.showRemove || modals.showFavourite"
      v-bind:header="selectedList.name"
      v-bind:content="getConfirmationModalContent()"
      v-bind:confirmText="getConfirmText()"
      cancelText="Cancel"
      v-bind:onCancel="onModalCancel"
      v-bind:onConfirm="onConfirmationModalConfirm"
      v-bind:invertButtons="modals.showFavourite"
  />
  <ListModal
      v-if="modals.showEdit"
      v-bind:isEditable="true"
      v-bind:list="selectedList"
      v-bind:removeItem="removeListItem"
      v-bind:editItem="editListItem"
      v-bind:moveItemUp="moveListItemUp"
      v-bind:moveItemDown="moveListItemDown"
      v-bind:onNameChange="updateListName"
      v-bind:onCancel="onModalCancel"
      v-bind:onConfirm="onEditModalConfirm"
  />
  <ListModal
      v-if="modals.showView"
      v-bind:isEditable="false"
      v-bind:list="selectedList"
      v-bind:onCancel="onModalCancel"
  />
  <div class="about">
    <h2 class="header">Available lists</h2>
    <p v-if="lists.length === 0">
      You don't have any available lists.
    </p>
    <ul class="lists">
      <li v-for="(list, index) in lists" :key="list.id" class="list-info">
        <div class="number">
          {{ index + 1 }}
        </div>
        <div class="info">
          <h3 class="name">{{ list.name }}</h3>
          <p>{{ list.items.length }} items</p>
        </div>
        <div class="controls">
          <div class="icon view" @click="setListToView(list)">
            <i class="far fa-eye" />
          </div>
          <div class="icon edit" @click="setListToEdit(list)">
            <i class="far fa-edit" />
          </div>
          <div class="icon delete" @click="setListToRemove(list)">
            <i class="far fa-trash-alt" />
          </div>
          <div
              class="icon favourite"
              v-bind:class="{ 'favourite-active': list.id === favouriteList.id }"
              @click="setListToMarkAsFavourite(list)"
          >
            <i class="fas fa-award" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import ListActionConfirmationModal from '../components/modals/ListActionConfirmationModal';
import ListModal from "../components/modals/ListModal";
export default {
  name: 'Settings',
  components: {
    ListActionConfirmationModal,
    ListModal,
  },
  computed: mapState({
    lists: state => state.lists,
    shoppingList: state => state.shoppingList,
    favouriteList: state => state.favouriteList,
  }),
  data: () => ({
    modals: {
      showRemove: false,
      showEdit: false,
      showView: false,
      showFavourite: false,
    },
    selectedList: {},
  }),
  methods: {
    editListItem: function(index, item) {
      this.$store.commit({
        type: 'updateShoppingListItem',
        index,
        item,
      })
    },
    removeListItem: function(index) {
      this.$store.commit({
        type: 'removeShoppingListItem',
        index,
      });
    },
    moveListItemUp: function(item) {
      this.$store.commit({
        type: 'moveShoppingListItemUp',
        item,
      });
    },
    moveListItemDown: function(item) {
      this.$store.commit({
        type: 'moveShoppingListItemDown',
        item,
      });
    },
    updateListName: function(name) {
      this.$store.commit({
        type: 'updateShoppingListName',
        name,
      })
    },
    getConfirmationModalContent: function() {
      const { showRemove } = this.modals;

      if (showRemove) {
        return `Are you sure you want to remove this list? It has a total of ${this.selectedList.items.length} items.`;
      }

      return `Are you sure you want to mark this list as favourite (${this.selectedList.items.length} items)?`;
    },
    getConfirmText: function() {
      const { showRemove } = this.modals;

      if (showRemove) {
        return 'Remove';
      }

      return 'Confirm';
    },
    removeList: function(list) {
      this.$store.commit({
        type: 'removeList',
        list,
      })
    },
    markListAsFavourite: function(list) {
      this.$store.commit({
        type: 'markListAsFavourite',
        list,
      })
    },
    setListToRemove: function(list) {
      this.selectedList = list;
      this.modals.showRemove = true;
    },
    onModalCancel: function() {
      this.selectedList = null;
      this.modals.showRemove = false;
      this.modals.showEdit = false;
      this.modals.showView = false;
      this.modals.showFavourite = false;
    },
    onConfirmationModalConfirm: function() {
      const { showRemove, showFavourite } = this.modals;

      if (showRemove) {
        this.removeList(this.selectedList);
        this.modals.showRemove = false;
      } else if (showFavourite) {
        this.markListAsFavourite(this.selectedList);
        this.modals.showFavourite = false;
      }

      this.selectedList = null;
    },
    setListToEdit: function(list) {
      this.$store.commit({
        type: 'setShoppingList',
        list,
      })
      this.selectedList = list;
      this.modals.showEdit = true;
    },
    onEditModalConfirm: function() {
      this.$store.commit({
        type: 'updateShoppingList',
      });
      this.selectedList = null;
      this.modals.showEdit = false;
    },
    setListToView: function(list) {
      this.selectedList = list;
      this.modals.showView = true;
    },
    setListToMarkAsFavourite: function(list) {
      this.selectedList = list;
      this.modals.showFavourite = true;
    }
  }
}
</script>
<style scoped>
.about {
  display: flex;
  flex-direction: column;
}
.header {
  margin-bottom: 40px;
}
.lists {
  margin: 0 auto;
}
.number {
  border-radius: 100%;
  background-color: #2c3e50;
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}
.list-info {
  display: flex;
  align-items: center;
}
.list-info .name {
  color: #42b983;
  text-align: left;
}
.list-info:not(:first-of-type) {
  margin-top: 20px;
}
.info {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  flex: 1;
}
.info p {
  text-align: left;
}
.controls {
  display: flex;
}
.controls .icon:not(:first-of-type) {
  margin-left: 10px;
}
</style>