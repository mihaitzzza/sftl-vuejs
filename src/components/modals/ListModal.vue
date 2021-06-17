<template>
  <div class="overlay">
    <div class="modal">
      <div class="header">
        <input v-if="isEditable" type="text" v-bind:value="list.name" @change="onInputChange"/>
        <h3 v-else>{{ list.name }}</h3>
      </div>
      <div class="content">
        <List
            v-bind:isEditable="isEditable"
            v-bind:items="list.items"
            v-bind:removeItem="removeItem"
            v-bind:editItem="editItem"
            v-bind:moveItemUp="moveItemUp"
            v-bind:moveItemDown="moveItemDown"
            v-bind:checkItem="checkListItem"
        />
      </div>
      <div v-if="isEditable" class="footer">
        <button @click="onCancel">Cancel</button>
        <button @click="onConfirm">Confirm</button>
      </div>
      <div v-else class="footer">
        <button @click="onCancel">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import List from '../List';

export default {
  name: 'ListModal',
  components: {
    List,
  },
  props: [
    'isEditable',
    'list',
    'onCancel',
    'onConfirm',
    'removeItem',
    'editItem',
    'moveItemUp',
    'moveItemDown',
    'onNameChange',
    'checkListItem',
  ],
  methods: {
    onInputChange: function (event) {
      this.onNameChange(event.target.value);
    }
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(44, 62, 80, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.modal .header {
  margin: 20px 0 20px;
  padding: 0 20px 20px;
  border-bottom: 1px solid #42b983;
  width: 100%;
  text-align: left;
}

.modal .header input {
  padding: 10px;
}

.modal .content,
.modal .footer {
  padding: 20px;
}

.modal .content {
  width: 100%;
}

.modal .content input {
  padding: 10px;
  width: 100%;
}

.modal .footer {
  width: 100%;
  text-align: right;
}

.modal .footer button:first-of-type {
  margin-right: 20px;
}

.modal .footer button {
  background-color: transparent;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}

.modal .footer button:first-of-type {
  margin-right: 20px;
  color: #dc3545;
  border: 1px solid #dc3545;
}

.modal .footer button:first-of-type:hover {
  background-color: #dc3545;
  color: white;
}

.modal .footer button:last-of-type {
  color: #42b983;
  border: 1px solid #42b983;
}

.modal .footer button:last-of-type:hover {
  background-color: #42b983;
  color: white;
}

.modal .footer button:disabled {
  pointer-events: none;
  border-color: #2c3e50;
  color: #2c3e50;
}
</style>