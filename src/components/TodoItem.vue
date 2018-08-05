<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <label>
        <input type="checkbox" v-model="todo.completed" @change="doneEdit"/>
      </label>
      <div v-if="!editing" @dblclick="editTodo"
           class="todo-item-label" :class="{ completed : completed }">
        {{ title }}
      </div>
      <label>
        <input v-else class="todo-item-edit" type="text" v-model="title"
               @blur="doneEdit"
               @keyup.enter="doneEdit" @keyup.escape="cancelEdit"
               v-focus>
      </label>
    </div>
    <div class="remove-item" @click="removeTodo(index)">
      &times;
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'beforeEditCache': ''
    }
  },
  watch: {
    checkAll () {
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTodo (index) {
      this.$emit('removeTodo', index)
    },
    editTodo () {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit () {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$emit('finishedEdit', {
        'index': this.index,
        'todo': {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing
        }
      })
    },
    cancelEdit () {
      this.title = this.beforeEditCache
      this.editing = false
    }
  }
}
</script>

<style scoped>

</style>
