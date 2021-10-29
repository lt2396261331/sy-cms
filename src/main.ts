import { createApp, App } from 'vue'

import { golbalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'

// 全局引入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import rootApp from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'
// import syRequest from './service'

const app: App = createApp(rootApp)

// golbalRegister(app)
app.use(router)
app.use(store)
setupStore()
// 注册element-plus
app.use(golbalRegister)
// 注册
// app.use(ElementPlus)
app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// syRequest.request({
//   url: 'home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的拦截器')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的respons')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// syRequest
//   .request<DataType>({
//     url: 'home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
