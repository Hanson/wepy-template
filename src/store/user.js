import wepy from '@wepy/core'
import http from '@/mixins/http'
import * as Utils from '@/mixins/utils'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    accessToken: null
  },
  mutations: {
    // 给当前modules赋值
    setState(state, [name, value]) {
      state[name] = value
    }
  },
  actions: {
    async login({dispatch}) {
      await dispatch('checkSession').then(code =>
        dispatch('getToken', code)
      ).then(response =>
        dispatch('saveToken', response)
      )
    },
    checkSession () {
      return wepy.wx.login().then(({ code }) =>
        Promise.resolve(code)
      )
    },
    async getToken ({ commit }, code) {
      return http('POST', 'login', {code: code})
    },
    saveToken ({ commit }, response) {
      let data = response.data.data
      commit('setState', ['accessToken', data.access_token]) // 保存 token
      commit('setState', ['userInfo', data.wechat_user]) // 保存微信用户信息
    }
  }
};
