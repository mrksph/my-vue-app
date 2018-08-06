<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done"
           v-model="newTodo" @keyup.enter="addTodo"/>

    <transition-group name="fade" enter-active-class="animated fadeInUp"
                      leave-active-class="animated fadeOutDown">

      <TodoItem v-for="todo in todosFiltered" :key="todo.id"
                :todo="todo" class="TodoItem" :checkAll="!anyRemaining">
      </TodoItem>
    </transition-group>

    <div class="extra-container">
      <TodoCheckAll></TodoCheckAll>
      <TodoItemsRemaining></TodoItemsRemaining>
    </div>

    <div class="extra-container">
      <div>
        <TodoFiltered></TodoFiltered>
        <div>
          <transition name="fade">
            <TodoClearCompleted></TodoClearCompleted>
          </transition>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'TodoList',
  components: {
    TodoClearCompleted,
    TodoFiltered,
    TodoItem,
    TodoCheckAll,
    TodoItemsRemaining,
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
    }
  },
  computed: {
    remaining () {
      return this.$store.state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining () {
      return this.remaining != 0
    },
    todosFiltered () {
      if (this.$store.state.filter == 'all') {
        return this.$store.state.todos
      } else if (this.$store.state.filter == 'active') {
        return this.$store.state.todos.filter(todo => !todo.completed)
      } else if (this.$store.state.filter == 'completed') {
        return this.$store.state.todos.filter(todo => todo.completed)
      }

      return this.$store.state.todos
    },
    showClearCompletedButton () {
      return this.$store.state.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.$store.commit('addTodo', {
        id: this.todo.idForTodo,
        title: this.todo.newTodo,
        completed: false,
      })

      this.$store.state.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      })

      this.newTodo = ''
      this.idForTodo++
    },
    /*
    removeTodo (id) {
      const index = this.$store.state.todos.findIndex((item) => item.id == id)
      this.$store.state.todos.splice(index, 1)
    }, */
    checkAllTodos () {
      this.$store.state.todos.forEach((todo) => (todo.completed = event.target.checked)
      )
    },
    clearCompleted () {
      this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
    },
    finishedEdit (data) {
      const index = this.$store.state.todos.findIndex((item) => item.id == data.id)
      this.$store.state.todos.splice(index, 1, data)
    }
  }
}
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;

    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  //CSS Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
