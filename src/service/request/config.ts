// 1.手动切换不同的环境（不推荐）
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'suyan'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'coderwhy'

// 2.根据process.env.NODE_ENV 来区分
// 开发环境：development
// 生产环境：production
// 测试环境：test
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://suyan.org/prod'
} else {
  BASE_URL = 'http://suyan.org/test'
}

export { BASE_URL, TIME_OUT }
