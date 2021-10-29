// service统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      // console.log('请求成功的拦截', config)
      return config
    },
    requestInterceptorsCatch: (error) => {
      console.log('请求失败的拦截')
      return error
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorsCatch: (error) => {
      console.log('响应失败的拦截')
      return error
    }
  }
})

export default hyRequest
