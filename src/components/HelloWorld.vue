<template>
  <div class="hello">
    <h1>Unix time: {{ date.toLocaleString() }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      date: new Date()
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.updateDate, 1000)
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    updateDate () {
      this.date = new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
