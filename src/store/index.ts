import { createStore } from 'vuex'

import { IRootState } from './type'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'suyan',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
