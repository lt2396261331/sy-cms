import { Module } from 'vuex'

import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '@/service/login/type'
import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserInfoMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRouter } from '@/utils/mapMenus'

const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = { ...userInfo }
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = [...userMenus]

      // userMenus --> routes
      const routes = mapMenusToRouter(userMenus)
      // 将routes添加到原来的router.main.childen
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      console.log(router.getRoutes())
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.执行登录逻辑
      const LoginResult = await accountLoginRequest(payload)
      const { id, token } = LoginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息的数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      // console.log(userInfo)
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.根据用户请求菜单
      const userMenusResult = await requestUserInfoMenusByRoleId(
        userInfo.role.id
      )
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      console.log(userMenus)

      // 4.跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
    // ihponeLoginAction({ commit }, payload: any) {
    //   console.log('执行: ihponeLoginAction', payload)
    // }
  }
}

export default LoginModule
