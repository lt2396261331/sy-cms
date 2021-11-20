import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'

import { getPageListDate } from '@/service/main/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'suyan',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据  菜单数据
      const departmentResult = await getPageListDate('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: department } = departmentResult.data
      console.log(departmentResult.data)

      const roleResult = await getPageListDate('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListDate('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', department)
      commit('changeEntireRole', roleList)
      commit('changEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
