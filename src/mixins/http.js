import wepy from '@wepy/core'
import {store} from '@/store/index'
import * as Utils from '@/mixins/utils'
import { BASE_URL } from '@/mixins/constant'

export default async function (method, url, data = {}) {
  // 直接从 storage 取出 token，而不是引入 store 去取是因为避免循环引用导致编译卡死
  const token = store.state.user.accessToken

  const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? {
      Authorization: `${token}`
    } : {})
  }

  data.app_id = wx.getAccountInfoSync().miniProgram.appId

  /*
   * 为简化流程，当请求为 GET 类型时，data 对象包含的数据类型只能是基本数据类型和数组
   * 此时 data 处理后的 url 形如: args[]=xxx&args[]=yyy&args[]=zzz&param1=111
   */
  if (method === 'GET') {
    Object.keys(data).forEach(key => {
      let paramStr = ''

      if (data[key] instanceof Array) {
        paramStr = data[key].map(item => `${key}[]=${item}`).join('&') + '&'
      } else {
        paramStr = `${key}=${data[key]}&`
      }

      url += '?' + paramStr
    })
    // _url += `app_id=${MINA_APP_ID}&`
    // 当生产环境时，GET方式提交数据携带dev为1的参数
    // _url += isProduction ? '' : 'dev=1&'
  }

  let response = await wepy.wx.request({
    // 当 url 不包含 http 协议头，则追加到 baseURL 上
    url: url.indexOf('http') !== 0 ? (BASE_URL + url) : url,
    data: (method === 'GET') ? undefined : {
      ...data
      // app_id: MINA_APP_ID,
      // dev: isProduction ? undefined : 1
    },
    header,
    method
  })

  // HTTP 状态码不为 200 或者软错误不为 0
  if (response.statusCode !== 200 || response.data.err_code) {
    let message = '网络异常，请稍后重试'

    switch (response.statusCode) {
      case 404:
        message = '资源不存在'
        break
      case 401:
        return await store.dispatch('user/login').then(() => {
          console.log('retry')
          console.log(method)
          console.log(url)
          console.log(data)
          store.dispatch('httpRetry', {method, url, data})  
        })

      default:
    }

    // 延迟到下一个宏任务才显示 toast 以便于业务页面控制是否 toast 默认的错误信息
    const timer = setTimeout(() => {
      Utils.toast(message)
    })

    // 默认抛出整个响应，已经去掉默认 toast 取消回调
    // eslint-disable-next-line no-throw-literal
    throw {
      response,
      // 用于在业务页面控制是否显示轻提示
      hideToast() {
        clearTimeout(timer)
      }
    }
  }

  return response
}
