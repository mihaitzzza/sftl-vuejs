<template>
  <div class="editable-list-container">
    <div v-if="!items.length">
      <h3>Please create a list by adding a new item.</h3>
    </div>
    <ul>
      <li v-for="item in items" :key="item.id" class="item-container">
        <div v-if="isEditable && itemToEdit.id === item.id" class="item-name">
          <input type="text" v-model="itemToEdit.name" placeholder="Item Name"  />
        </div>
        <div v-else class="item-name">{{ item.name }}</div>
        <div v-if="isEditable && itemToEdit.id === item.id" class="item-qty">
          <input type="text" v-model="itemToEdit.qty" placeholder="Item Qty." />
        </div>
        <div v-else class="item-qty">{{ item.qty }}</div>
        <div
            v-if="isEditable"
            class="icon edit"
            v-bind:class="{ disabled: itemToEdit.id }"
            role="button"
            tabindex="0"
            @click="edit(item.id)"
        >
          <i class="far fa-edit" />
        </div>
        <div
            v-if="isEditable && itemToEdit.id === item.id"
            class="icon remove"
            role="button"
            tabindex="0"
            @click="cancelChanges()">
          <i class="fas fa-times" />
        </div>
        <div
            v-if="isEditable && itemToEdit.id !== item.id"
            class="icon move-down" v-bind:class="{ disabled: itemToEdit.id }"
            role="button"
            tabindex="0"
            @click="moveItemDown(item)"
        >
          <i class="fas fa-chevron-down" />
        </div>
        <div
            v-if="isEditable && itemToEdit.id === item.id"
            class="icon accept"
            role="button"
            tabindex="0"
            @click="saveItem()"
        >
          <i class="fas fa-check" />
        </div>
        <div
            v-if="isEditable && itemToEdit.id !== item.id"
            class="icon move-up"
            v-bind:class="{ disabled: itemToEdit.id }"
            role="button"
            tabindex="0"
            @click="moveItemUp(item)"
        >
          <i class="fas fa-chevron-up" />
        </div>
        <div
            v-if="isEditable"
            class="icon delete"
            v-bind:class="{ disabled: itemToEdit.id }"
            role="button"
            tabindex="0"
            @click="deleteItem(item.id)"
        >
          <i class="far fa-trash-alt"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'List',
  props: ['items', 'isEditable', 'editItem', 'removeItem', 'moveItemUp', 'moveItemDown'],
  data: () => ({
    itemToEdit: {},
  }),
  methods: {
    edit: function(itemId) {
      const itemIndex = this.items.findIndex(({ id }) => id === itemId)
      this.itemToEdit = {
        ...this.items[itemIndex]
      };
      setTimeout(() => {
        document.querySelector(`.editable-list-container ul .item-container:nth-child(${itemIndex + 1}) input:first-child`).focus();
      }, 0);
    },
    deleteItem: function(itemId) {
      const itemIndex = this.items.findIndex(({ id }) => id === itemId);
      this.removeItem(itemIndex);
    },
    cancelChanges: function() {
      this.itemToEdit = {};
    },
    saveItem: function() {
      const index = this.items.findIndex(({ id }) => id === this.itemToEdit.id);
      this.editItem(index, this.itemToEdit);
      this.itemToEdit = {};
    },
  }
}
</script>
<style>
.editable-list-container ul .item-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.editable-list-container ul .item-container .item-name {
  flex: 1;
  text-align: left;
}
.editable-list-container ul .item-container *:not(:last-child) {
  margin-right: 20px;
}
.editable-list-container ul .item-container .item-name,
.editable-list-container ul .item-container .item-name input,
.editable-list-container ul .item-container .item-qty,
.editable-list-container ul .item-container .item-qty input {
  font-size: 16px;
  font-weight: bold;
}
.editable-list-container ul .item-container .item-qty {
  width: 100px;
  text-align: right;
}
.editable-list-container ul .item-container .item-name input,
.editable-list-container ul .item-container .item-qty input {
  width: 100%;
  padding: 10px;
}
.editable-list-container ul .item-container .item-qty input {
  text-align: right;
}
</style>