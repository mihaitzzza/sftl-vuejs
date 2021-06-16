<template>
  <Notification
      v-if="newListNotification.show"
      type="success"
      v-bind:message="newListNotification.message"
      v-bind:onDismiss="hideNewListNotification"
  />
  <ListNameModal
      v-if="showConfirmModal"
      header="What's this list for?"
      placeholder="Give this list a name."
      v-bind:onCancel="onModalCancel"
      v-bind:onConfirm="onModalConfirm"
  />
  <div class="new-list-container">
    <List
        v-bind:items="shoppingList.items"
        v-bind:isEditable="true"
        v-bind:removeItem="removeListItem"
        v-bind:editItem="editListItem"
        v-bind:moveItemUp="moveListItemUp"
        v-bind:moveItemDown="moveListItemDown"
    />
    <div class="new-item-container">
      <input id="add-item-name" v-model="item.name" type="text" placeholder="New Item" @keydown="onKeyDown" />
      <input id="add-item-qty" v-model="item.qty" type="text" placeholder="Quantity" @keydown="onKeyDown" />
      <div role="button" tabindex="0" class="icon remove" @click="resetItem">
        <i class="fas fa-times" />
      </div>
      <div role="button" tabindex="0" class="icon accept" @click="saveItem">
        <i class="fas fa-check" />
      </div>
    </div>
    <div class="create-list-container">
      <button class="remove" :disabled="shoppingList.items.length === 0" @click="resetList">
        Reset List
      </button>
      <button class="create" :disabled="shoppingList.items.length === 0" @click="openModal">
        Create List
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import List from '../components/List';
import ListNameModal from '../components/modals/ListNameModal';
import Notification from '../components/Notification'
export default {
  name: 'NewList',
  components: {
    List,
    ListNameModal,
    Notification,
  },
  data: () => ({
    item: {},
    showConfirmModal: false,
    newListNotification: {
      show: false,
      message: null,
    }
  }),
  computed: mapState({
    shoppingList: state => state.shoppingList,
  }),
  methods: {
    addListItem: function() {
      this.$store.commit({
        type: 'addShoppingListItem',
        item: this.item
      })
    },
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
    resetList: function() {
      this.$store.commit({
        type: 'resetShoppingList'
      });
      this.setFocus();
    },
    createList: function(name) {
      this.$store.commit({
        type: 'createShoppingList',
        name,
      });
      this.setFocus();
    },
    setFocus: function() {
      document.querySelector('#add-item-name').focus();
    },
    validateItem: function() {
      return this.item.name && this.item.qty;
    },
    onKeyDown: function(event) {
      const isEnterKey = event.keyCode === 13;
      isEnterKey && this.saveItem();
    },
    resetItem: function() {
      this.item = {};
    },
    saveItem: function() {
      const isValid = this.validateItem();

      if (isValid) {
        this.addListItem();
        this.item = {};
        this.setFocus();
      }
    },
    openModal: function() {
      this.showConfirmModal = true;
    },
    onModalCancel: function() {
      this.showConfirmModal = false;
      this.setFocus();
    },
    onModalConfirm: function(name) {
      this.createList(name);
      this.showConfirmModal = false;
      this.newListNotification = {
        show: true,
        message: `${name} was successfully created.`,
      }
      setTimeout(() => {
        this.newListNotification = {
          show: false,
          message: null,
        }
      }, 3000);
    },
    hideNewListNotification: function() {
      this.newListNotification.show = false;
    },
  },
}
</script>
<style>
.new-list-container {
  width: 60%;
  margin: 0 auto;
}
.new-item-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.new-item-container *:not(:first-child) {
  margin-left: 20px;
}
.new-item-container input {
  padding: 10px;
}
.new-item-container input:first-child {
  flex: 1;
}
.create-list-container {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
}
.create-list-container button {
  background-color: transparent;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
.create-list-container button.remove {
  margin-right: 20px;
  color: #dc3545;
  border: 1px solid #dc3545;
}
.create-list-container button.remove:hover {
  background-color: #dc3545;
  color: white;
}
.create-list-container button.create {
  color: #42b983;
  border: 1px solid #42b983;
}
.create-list-container button.create:hover {
  background-color: #42b983;
  color: white;
}
.create-list-container button:disabled {
  pointer-events: none;
  border-color: #2c3e50;
  color: #2c3e50;
}
</style>