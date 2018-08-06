<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: 'TodoItemsRemaining',
  props: {
    computed () {
      return this.$store.getters.remaining
    }
  }
}
</script>

<style scoped>

</style>
