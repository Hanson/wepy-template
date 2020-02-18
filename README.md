# wepy-template

基于 wepy 的小程序开发模板，此项目为了减少每次新项目的基础代码工作量，此项目 UI 使用 [youzan/vant-weapp](https://github.com/youzan/vant-weapp)

## 安装

```
git clone https://github.com/Hanson/wepy-template.git my-project
cd my-project
npm install

// 开发环境
npm run dev

// 正式环境 
npm run build
```

## 功能

* 自动登录（每次进小程序都会进行登录）`store/user.js`
* 使用自定义 `tabbar`，效果很好 `custom-tab-bar/index.wpy`
* token 失效接口出现 401 状态码时，自动登录并重试上一个接口

## 加入优化

此项目代码还有很多优化空间，欢迎一起改进
