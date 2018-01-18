import axios from 'axios'
// 设置请求的基准路径 以后再用的时候 就可以直接写login之类的
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'
// 登陆拦截器 拦截处理token 因为token在请求头里 所以 axios在发送请求前 需要用拦截器验证token 

axios.interceptors.request.use(function (config) {
  // 获取当前是否存在token// 如果token存在 则在请求头里加上Authorization
  let token = localStorage.getItem('mytoken')
  if (token) {
    // Authorization 请求头的键是前后台约定 config是请求时的配置参数
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 实现登录功能  封装了login方法暴露出去 在login.vue里使用
export const login = (params) => {
  return axios.post('login', params).then(res => {
    // axios用的是promise风格的语法  返回具体的数据，前面放上return 表示再返回一个promise对象 用来传递给下一个then使用
    // 别忘了axios 还吧请求封装成了一个总的data 所以返回数据为res.data
    // post 链接的是 后台数据接口路径 
    return res.data
  })
}