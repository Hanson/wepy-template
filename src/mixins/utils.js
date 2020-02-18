/**
 * 安全地获取嵌套对象的属性
 * 特别注意：为了简化判断流程，undefined 和 null 均返回 undefined
 * @param {object} target - 目标对象
 * @param {string} path - 属性路径
 * @param {any} defaultValue - 默认值
 * @return {any} 目标属性
 */
export function path(target, path, defaultValue) {
  // 判断是否为无值，即 undefined 或者 null
  const isNil = value => value === null || value === undefined
  const value = path
    .split('.')
    .reduce(
      (last, key) => (key && last && !isNil(last[key]) ? last[key] : undefined),
      target
    )

  return isNil(value) ? defaultValue : value
}

/**
 * 凯撒加密
 * 用途参照：https://www.yuque.com/cblink/cbufo/solution-about-audit-rejecting-causing-by-plain-secret
 * @param {string} str - 原始字符串
 * @param {number} offset - 字符偏移量
 * @return {string} 加密后的字符串
 */
export function caesarCoder(str, offset = 1) {
  return str
    .split('')
    .map(item => String.fromCharCode(item.charCodeAt() + offset))
    .join('')
}

// 轻提示
export function toast(title = '', duration = 2500, mask = false, icon = 'none') {
  // 要先隐藏
  wx.hideToast()
  wx.showToast({
    title,
    duration,
    mask,
    icon
  })
}

// 加载提示
export function loading(title = '', mask = true) {
  // 要先隐藏
  wx.hideLoading()
  wx.showLoading({
    title,
    mask
  })
}

// 隐藏加载提示
export function hideLoading() {
  wx.hideLoading()
}

// 判断用户授权情况
// type: 授权类型
/**
 * result的值可能为： undefined、 false、 true
 * undefined： 是用户第一次进入页面中询问用户是否需要开通某功能权限
 * false： 是用户曾经拒绝过选择某功能授权后的情况
 * true： 是用户授权选择某功能权限
 */
export async function checkAuthSetting(type) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        // 判断权限是否拒绝，拒绝的话，需要用户点击获取授权
        resolve(res['authSetting']['scope.' + type])
      }
    })
  })
}

// 拨打电话
export function makePhoneCall({contact_phone}) {
  wx.makePhoneCall({
    phoneNumber: contact_phone
  })
}

// 导航门店地址
export function navigateRoute({ lat, lng, name, address }) {
  wx.openLocation({
    latitude: Number(lat), // 纬度，范围为-90~90，负数表示南纬
    longitude: Number(lng), // 经度，范围为-180~180，负数表示西经
    scale: 28, // 缩放比例
    name: name, // 位置名
    address: address // 地址的详细说明
  })
}

// modal
export function showModal(options) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...options,
      confirmColor: '#87b178',
      success: resolve,
      fail: reject
    })
  })
}

// 检测订阅消息
export function requestSubscribeMessage({ tmplIds }) {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds,
      success: (res) => {
        console.log('成功调用：', res)
        resolve(res)
      },
      fail: (error) => {
        /**
         * 错误处理下、目前只处理订阅消息的开关被关闭的状态（其他错误：默认处理）
         * 分为2种情况：
         * 1、订阅消息按钮开关未开启 => 打开授权框去开启订阅信息
         * 2、未知错误 => 直接调用原本要操作事件（无订阅消息推送而已）
         */
        switch (error.errCode) {
          case 20004:
            error.visible = true
            break
          default:
            error.visible = false
            this.$toast('订阅信息功能出现问题，有可能您将收不到信息通知~')
            break
        }
        console.error('调用失败：', error)
        reject(error)
      }
    })
  })
}
