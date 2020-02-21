# wepy-template

基于 wepy 的小程序开发模板，此项目为了减少每次新项目的基础代码工作量，此项目 UI 使用 [youzan/vant-weapp](https://github.com/youzan/vant-weapp)

## 截图

<center class="half">
    <img src="https://i.loli.net/2020/02/18/YQa9VGS2d6kBI81.png" height="400"/><img src="https://i.loli.net/2020/02/22/a5RGleJ4hyID6uX.png" height="400"/>
</center>

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

## to do list

* [x] 货架列表 页面模板
* [ ] 我的 页面模板
* [ ] 我的订单 页面模板
* [ ] 商品列表 页面模板
* [ ] 商品详情 页面模板
* [ ] 下单页 页面模板

## 加入优化

此项目代码还有很多优化空间，欢迎一起改进
