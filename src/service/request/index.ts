import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'
// axios -< axios instance（实例）

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器时对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorsCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求拦截成功')

        // 判断要不要loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.7)',
            spinner: 'el-icon-loading'
          })
        }

        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求拦截失败')
        return err
      }
    ),
      this.instance.interceptors.response.use(
        (res) => {
          // console.log('所有的实例都有的拦截器：响应拦截成功')

          // 将loading移除
          this.loading?.close()

          const data: any = res.data
          if (data.returnCode === '-1001') {
            // console.log('请求失败, 错误信息')
          } else {
            return res.data
          }
        },
        (err) => {
          // console.log('所有的实例都有的拦截器：响应拦截失败')
          // 将loading移除
          this.loading?.close()
          // 例子：判断不同的HttpErrorCode显示不同的错误信息
          if (err.respones.status === 404) {
            console.log('404错误~')
          }
          return err
        }
      )
  }

  // 基本发送请求方法
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单独的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      // 单独的响应拦截器
      this.instance.request<any, T>(config).then(
        (res) => {
          // 1.单个请求对诗句的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading设置true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回
          resolve(res)
        },
        (err) => {
          // 将showLoading设置true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        }
      )
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
