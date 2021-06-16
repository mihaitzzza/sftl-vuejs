<template>
  <div class="flex">
    <button @click="decrementBy">&lt;&lt;</button>
    <button @click="decrement">-</button>
    <div>{{ counter }}</div>
    <button @click="increment">+</button>
    <button @click="incrementBy">&gt;&gt;</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {},
  computed: mapState({
    counter: state => state.counter
  }),
  methods: {
    ...mapMutations(['increment', 'decrement']),
    incrementBy: function() {
      this.$store.commit({
        type: 'incrementBy',
        amount: 2
      })
    },
    decrementBy: function() {
      this.$store.commit({
        type: 'decrementBy',
        amount: 2
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
  display: flex;
}

.flex div,
.flex button {
  margin: 0 20px;
}
</style>
