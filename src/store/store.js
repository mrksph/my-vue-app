/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        'id': 1,
        'title': 'Finish Vue Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': true,
        'editing': false,
      }
    ]
  },
  getters: {
    remaining () {
      return this.$store.getters.remaining
    },
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered
    },
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    }
  },
  mutations: {

  }
})
