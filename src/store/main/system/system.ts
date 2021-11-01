import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'

import { getPageListDate } from '@/service/main/system/system'

const pageUrlMap = {
  users: '/api/as/sd'
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: []) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: []) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //     break
        //   case 'role':
        //     return state.roleList
        //     break
        // }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.根据不同的pageName加载不同的pageUrl
      const pageName = payload.pageName
      const pageUrl = `${pageName}/list`
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'user':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      console.log(payload.pageUrl)
      console.log(payload.queryInfo)

      // 2.对页面发送请求
      const pageListResult = await getPageListDate(pageUrl, payload.queryInfo)

      console.log(pageListResult)

      // 3.将数据存储到state中
      const { list, totalCount } = pageListResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      // switch (pageName) {
      //   case 'user':
      //     commit(`changeUserList`, list)
      //     commit(`changeUserCount`, totalCount)
      //     break
      //   case 'role':
      //     commit(`changeRoleList`, list)
      //     commit(`changeRoleCount`, totalCount)
      //     break
      // }
    }
  }
}

export default systemModule
