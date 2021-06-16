<template>
  <div v-if="isVisible" class="notification" v-bind:class="type">
    {{ message }} {{ type }}
    <div class="icon-wrapper" @click="dismiss">
      <i class="fas fa-times" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message', 'onDismiss', 'type'],
  data: () => ({
    isVisible: true
  }),
  methods: {
    dismiss: function() {
      this.isVisible = false;
      this.onDismiss();
    },
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  left: calc(50% - 250px);
  padding: 0 20px;
  border-radius: 6px;
  width: 500px;
  text-align: left;
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  background-color: #17a2b8;
  color: white;
}
.notification.success {
  background-color: #42b983;
  color: white;
}
.notification.warning {
  background-color: #ffc107;
  color: black;
}
.notification.error {
  background-color: #dc3545;
  color: white;
}
.notification .icon-wrapper {
  cursor: pointer;
}
</style>