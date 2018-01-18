import Vue from 'vue'
import App from './App'
import router from './router'

// 加载UI组件
import ElementUI from 'element-ui'
// 加载主题
import 'element-ui/lib/theme-chalk/index.css'
// 启用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局导航过滤(其实就是拦截路由请求,所有的路由在发出去之前都要判断
// 用router.beforeEach(to,from,next) 路径去哪 从哪个路径来 下一步执行
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  // 判断token是否存在 如果存在 执行下一步登录
  if (user) {
    // 允许通过，按照正常的逻辑向下跳转
    next()
  } else {
    // 如果不存在 且跳转的不是登录页 则让其跳转到登录页
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      // 不存在 但是要跳转的是录页面 执行跳转
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
  // render函数内部生成了一个模板字符串 渲染模板 本质上和template一样
  //  渲染完返回给组件app.vue里 显示在<router-view></router-view>里
})
 