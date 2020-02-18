import wepy from '@wepy/core'
import Vuex from '@wepy/x'
import http from '@/mixins/http'

import tabbar from './tabbar'
import user from './user'

// 注册插件
wepy.use(Vuex)

// 初始化 store
export const store = new Vuex.Store({
  mutations: {
    // 给模块的state赋值
    setState(state, { name, value }) {
      let moduleName = name.split('/')[0]
      let target = name.split('/')[1]
      // 给模块的state赋值
      if (moduleName && target) {
        state[moduleName][target] = value
      }

      // 给全局的state赋值
      if (moduleName && !target) {
        state[moduleName] = value
      }
    }
  },
  modules: {
    tabbar: tabbar,
    user: user
  },
  actions: {
    httpRetry ({ commit }, params) {
      console.log('http retry')
      return http(params.method, params.url, params.data)
    }
  }
})