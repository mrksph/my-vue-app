<template>
  <button v-if="showClearCompletedButton"
          @click="clearCompleted">
    Clear Completed
  </button>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: 'TodoClearCompleted',
  computed: {
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted () {
      this.$store.dispatch('clearCompleted')
    },
  },
}
</script>

<style>

</style>
