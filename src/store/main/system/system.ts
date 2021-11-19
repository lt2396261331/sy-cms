import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'

import {
  getPageListDate,
  deletePageData,
  createPageData,
  eidtPageData
} from '@/service/main/system/system'

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
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    },
    changeGoodsList(state, goodsList: []) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: []) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
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
    },
    pageListCount(state) {
      return (pageName: string) => {
        console.log('vuex--', state.usersCount)
        return (state as any)[`${pageName}Count`]
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

      // console.log(payload.pageUrl)
      // console.log(payload.queryInfo)

      // 2.对页面发送请求
      const pageListResult = await getPageListDate(pageUrl, payload.queryInfo)

      // console.log(pageListResult)

      // 3.将数据存储到state中
      const { list, totalCount } = pageListResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      // console.log('调用Mutation')
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
    },

    async deletePageDataAction(context, payload: any) {
      // 1.获取pageName和id
      // pageName --> /users
      // id --> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.调用删除的网络请求
      const result = await deletePageData(pageUrl)
      console.log(result)
      // 3.重新请求最新的数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const createResult = await createPageData(pageUrl, newData)
      console.log(createResult)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async eidtPageDataAction({ dispatch }, payload) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      const editResult = await eidtPageData(pageUrl, editData)
      console.log(editResult)
      // 2.发送最新的网络请求
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
