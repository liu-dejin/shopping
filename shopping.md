## 综合案例 智慧商城

![](./assets/1751419728941-87c7d827-5be9-4e3a-9092-aa0667597b2f.png)

### 调整目录

![](./assets/1751421681658-aeb3eb3d-2590-4e97-ae77-8c1ea5ab8c9c.png)

### vant2

![](./assets/1751423971899-a371348e-f1b5-4f28-bec2-c2f93a614705.png)

全部导入

<font style="color:rgb(77, 77, 77);">① 安装 vant-ui</font>

```plain
yarn add vant@latest-v2
```

<font style="color:rgb(77, 77, 77);">② main.js 中注册</font>

```plain
import Vant from 'vant'
import 'vant/lib/index.css'
// 把vant中所有的组件都导入了
Vue.use(Vant)
```

<font style="color:rgb(77, 77, 77);">③ 使用测试</font>

```jsx
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
```

按需导入

<font style="color:rgb(77, 77, 77);">① 安装 vant-ui (已安装)</font>

```plain
yarn add vant@latest-v2
```

<font style="color:rgb(77, 77, 77);">② 安装插件</font>

```plain
npm i babel-plugin-import -D
```

<font style="color:rgb(77, 77, 77);">③ babel.config.js 中配置</font>

```plain
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
    ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
}
```

<font style="color:rgb(77, 77, 77);">④ main.js 按需导入注册</font>

```plain
import Vue from 'vue';
import { Button } from 'vant';
Vue.use(Button);
```

<font style="color:rgb(77, 77, 77);">⑤ 测试使用</font>

```plain
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
```

<font style="color:rgb(77, 77, 77);">⑥ 提取到 vant-ui.js 中，main.js 导入	</font>

`<font style="background-color:rgba(0, 0, 0, 0.04);">import '@/utils/vant-ui'</font>`<font style="color:rgb(59, 59, 59);background-color:rgba(0, 0, 0, 0.04);"> 的作用是执行代码，不是导入变量故不用导出</font>

```jsx
// 导入按需导入的配置文件
import '@/utils/vant-ui'
```

### <font style="color:rgb(79, 79, 79);">目中的 vw 适配</font>

**<font style="color:rgb(77, 77, 77);">目标：基于 postcss 插件 实现项目 vw 适配</font>**

<font style="color:rgb(77, 77, 77);">[官方配置][https://vant-contrib.gitee.io/vant/v2/#/zh-CN/advanced-usage]</font>

<font style="color:rgb(77, 77, 77);">① 安装插件</font>

```plain
yarn add postcss-px-to-viewport@1.1.1 -D


1
```

<font style="color:rgb(77, 77, 77);">② 根目录新建 postcss.config.js 文件，填入配置</font>

```jsx
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
        // 标准屏宽度
        viewportWidth: 375
    }
}
}
```

### 封装axios

```javascript
import axios from 'axios'
// 创建axios实例,对创建axios实例进行自定义配置
// 好处:不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 自定义配置 请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多一层data,需要响应拦截器处理一下)
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出配置好的实例
export default instance

----测试使用-----
  组件内使用
  import request from '@/utils/requset'
export default {
  name: 'LoginPage',
  async created () {
    const res = await request({
      url: 'http://smart-shop.itheima.net/index.php?s=/api/captcha/image'
    })
    console.log(res)
  }
}
```

### 图形验证码功能

对响应结果解构赋值封装

<font style="color:rgb(52, 64, 84);">{ "status": 200, "message": "success", "data": { "base64": "data:image\/png;base64,xxx", "key": "$2y$10$rfeeAQ4CD0p4QgBk8kJyx.Xwn4u1UjIvogE\/3pZVtv2.1tKMapiH2", "md5": "f25ae60901ff709150605330b8fb50d1" } }</font>

![](./assets/1751436242810-313c68c0-11e9-47c7-84d6-de8e9e937310.png)

api接口模块-封装图片验证码接口

![](./assets/1751437060778-939f6b86-da81-4760-90a9-7f8722bb66cb.png)

![](./assets/1751437144252-97c9a9d9-ab8a-4dc8-8636-2abcd1014507.png)

### toast轻提示

**<font style="color:rgb(59, 59, 59);background-color:rgba(0, 0, 0, 0.04);">每个文件都需要显式导入自己要用的变量/函数/组件</font>**

<font style="color:rgb(77, 77, 77);">注册安装：</font>

```plain
import { Toast } from 'vant'
Vue.use(Toast)
```

<font style="color:rgb(77, 77, 77);">两种使用方式</font>

<font style="color:rgb(77, 77, 77);">① 导入调用 (组件内 或 非组件中均可)(相当于导入了两次 因为</font><font style="color:rgb(59, 59, 59);background-color:rgba(0, 0, 0, 0.04);">Toast 是函数调用形式，不是组件标签</font><font style="color:rgb(77, 77, 77);">)</font>

```plain
import { Toast } from 'vant'
Toast('提示内容')
```

<font style="color:rgb(77, 77, 77);">② 通过this直接调用 (必须组件内)</font>

<font style="color:rgb(77, 77, 77);">本质：将方法，注册挂载到了Vue原型上</font><font style="color:rgb(77, 77, 77);"> </font>`<font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">Vue.prototype.$toast = xxx</font>`

```jsx
this.$toast('提示内容')
```

### 短信验证倒计时

#### 基础功能

![](./assets/1751439781957-893a2c5e-4856-4913-8232-e8167b7520f7.png)

#### 验证码请求检验处理

![](./assets/1751440825567-c9d5b001-54db-4cdc-a0d4-2c5c38b71e29.png)

#### 封装短信验证请求接口

![](./assets/1751441412584-62836999-13f7-40a9-921b-6cc52db1bbde.png)

### 登录接口

![](./assets/1751443922364-44d2035c-a54b-42ee-b53b-73f0d58824b1.png)

### 响应拦截器

```javascript
// 添加响应拦截器 统一处理错误
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多一层data,需要响应拦截器处理一下)
  const res = response.data
  // console.log(res)
  if (res.status !== 200) {
    // 提示
    Toast(res.message)
    // 抛出promise
    return Promise.reject(res.message)
  }
  return response.data
```

### token存入vuex

![](./assets/1751445939508-58a8c381-40f4-4e0b-9ceb-42d5d881725a.png)

### storage存储模块

vuex持久化处理

![](./assets/1751448905521-30648f58-4a42-4e4b-9a80-5843a60bf1dc.png)

### loading效果 节流-友好提示

![](./assets/1751449909483-43bf852d-416c-4a00-89ea-380a91ce2ca3.png)

### 全局前置导航守卫

未登录用户无法进入一些核心页面(拦截)

<font style="color:rgb(77, 77, 77);">访问权限页面时，拦截或放行的关键点？ → </font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">用户是否有登录权证 token</font>

![](./assets/1751453837027-5c0b15fe-5f0f-4e1b-818f-811a38ba22f0.png)

![](./assets/1751453772344-0e6c2b0f-768e-4b95-b045-7060c86167d9.png)

### 封装接口,动态渲染

![](./assets/1751455746432-eb401352-018c-462b-a108-d82e90be6a68.png)

### <font style="color:rgb(79, 79, 79);">历史记录管理</font>

1. <font style="color:rgba(0, 0, 0, 0.75);">搜索历史基本渲染</font>
2. <font style="color:rgba(0, 0, 0, 0.75);">点击搜索 (添加历史)</font>

<font style="color:rgb(77, 77, 77);">点击 搜索按钮 或 底下历史记录，都能进行搜索</font>

<font style="color:rgb(77, 77, 77);">① 若之前</font><font style="color:rgb(77, 77, 77);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">没有</font><font style="color:rgb(77, 77, 77);"> </font><font style="color:rgb(77, 77, 77);">相同搜索关键字，则直接</font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">追加到最前面</font>

<font style="color:rgb(77, 77, 77);">② 若之前</font><font style="color:rgb(77, 77, 77);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">已有</font><font style="color:rgb(77, 77, 77);"> </font><font style="color:rgb(77, 77, 77);">相同搜索关键字，将该</font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">原有关键字移除，再追加</font>

3. <font style="color:rgba(0, 0, 0, 0.75);">清空历史：添加清空图标，可以清空历史记录</font>
4. <font style="color:rgba(0, 0, 0, 0.75);">持久化：搜索历史需要持久化，刷新历史不丢失</font>

![](./assets/1751463497887-a82fdd08-2fe7-4bfa-ba1f-444b933aa8d8.png)

### 搜索列表

#### 搜索关键字搜索

![](./assets/1751509020690-cf7ed6aa-4f53-48cc-be20-d732052aaac7.png)

#### 分类id搜索


![](./assets/1751510570793-ec373328-1bf1-4f91-98bd-4e869c57d8d9.png)

### 商品详细页

![](./assets/1751527001090-46074d1e-55de-4279-b0ee-0b3f5715e8a5.png)

### 加入购物车

#### 弹层显示

#### ![](./assets/1751529558940-3fbcbd17-3b52-4417-9e37-4d1d44f99468.png)

#### 封装数字框组件

1. <font style="color:rgba(0, 0, 0, 0.75);">静态结构，左中右三部分</font>
2. <font style="color:rgba(0, 0, 0, 0.75);">数字框的数字，应该是外部传递进来的 (</font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">父传子</font><font style="color:rgba(0, 0, 0, 0.75);">)</font>
3. <font style="color:rgba(0, 0, 0, 0.75);">点击 + - 号，可以修改数字 (</font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">子传父</font><font style="color:rgba(0, 0, 0, 0.75);">)</font>
4. <font style="color:rgba(0, 0, 0, 0.75);">使用</font><font style="color:rgba(0, 0, 0, 0.75);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(248, 248, 64);">v-model</font><font style="color:rgba(0, 0, 0, 0.75);"> </font><font style="color:rgba(0, 0, 0, 0.75);">实现封装 (:value 和 @input 的简写)</font>
5. <font style="color:rgba(0, 0, 0, 0.75);">数字不能减到小于 1</font>
6. <font style="color:rgba(0, 0, 0, 0.75);">可以直接输入内容，输入完成判断是否合法</font>

![](./assets/1751534368523-d02b2751-0f7b-4aa5-a2b8-57ec621a5646.png)

#### 判断token登录状态

![](./assets/1751538946477-0bca3b84-23d8-4af5-a475-f1f5e7aa6beb.png)

![](./assets/1751552250520-d28315a8-9a08-403b-b95c-2a2f8b83a055.png)

### 购物车

#### vuex获取存储数据

![](./assets/1751554656117-6b41ca49-0aac-41b4-8681-52872d279315.png)

#### mapState渲染数据

:value="item.isChecked"

:value="item.goods_num"	不能使用v-model

![](./assets/1751588501376-085ecbaa-6ef9-4588-bb24-cfb0e837444c.png)

#### getter动态统计

![](./assets/1751590603358-95c8d4f5-83a9-4e37-92f4-8b66e21d145e.png)

#### 全选反选

点击小选修改状态

![](./assets/1751592486921-78556e45-0e36-4699-bd85-c609f1a452d6.png)

小选控制全选

![](./assets/1751592618041-a2193fab-5057-410e-af54-a855d55d7896.png)

全选控制小选

![](./assets/1751592874657-ac6bc1b9-4e00-4688-81a6-5c8480819604.png)

#### 数字框修改数量

![](./assets/1751594851769-9e6a4def-20c6-4eb7-af68-95a578f993c0.png)

**<font style="color:rgb(51, 51, 51);">编辑切换状态</font>**

**<font style="color:rgb(51, 51, 51);"></font>**

![](./assets/1751595562888-b1d54ba0-4e53-4170-be8a-40d7955c1695.png)

#### 删除功能

![](./assets/1751598102512-77c038ea-39ea-44f2-beda-e852fb92ece5.png)

#### 空购物车的处理

```vue
<div class="cart-box" v-if="isLogin && cartList.length > 0">
  <!-- 购物车开头 -->
  <div class="cart-title">
    ...
  </div>
  <!-- 购物车列表 -->
  <div class="cart-list">
    ...
  </div>
  <div class="footer-fixed">
    ...
  </div>
</div>

<div class="empty-cart" v-else>
  <img src="@/assets/empty.png" alt="">
  <div class="tips">
    您的购物车是空的, 快去逛逛吧
  </div>
  <div class="btn" @click="$router.push('/')">去逛逛</div>
</div>
```

### 订单结算台

### 收货地址

![](./assets/1751605730874-4b5b4f8c-a77d-4208-9a66-f589ff7b285f.png)

### 订单结算

订单结算，有两种情况：

1. 购物车结算，需要两个参数① mode="cart"② cartIds="cartId, cartId"
2. 立即购买结算，需要三个参数① mode="buyNow"② goodsId="商品id" ③ goodsSkuId="商品skuId"

都需要跳转时将参数传递过来

#### 购物车结算

购物车界面去支付传递mode和cartIds

![](./assets/1751608970539-400e6a1b-275f-48f5-92b9-951b97cc60d0.png)

![](./assets/1751609383841-3d15cdd8-85b6-456b-8160-ad4cda63a2e6.png)

商品界面传参 支付界面compute接收

![](./assets/1751613648102-0a6ff13d-a717-46d5-8d6c-915f15dd8113.png)

加一个登录校验利用到mixins  将登录验证封装

```vue
import loginConfirm from '@/mixins/loginConfirm'

export default {
  name: 'ProDetail',
  mixins: [loginConfirm],
  ...
}
```



#### 提交订单并支付

![](./assets/1751614896254-cdf3aa01-ddd8-472c-965f-cf3c716d2d67.png)

### 订单管理和个人中心

给name属性也是为了个人中心页面可以跳转

```vue
<!-- 在标签指定 name 属性的情况下，v-model 的值为当前标签的 name -->
<van-tabs v-model="active" sticky>
  <van-tab name="all" title="全部"></van-tab>
  <van-tab name="payment" title="待支付"></van-tab>
  <van-tab name="delivery" title="待发货"></van-tab>
  <van-tab name="received" title="待收货"></van-tab>
  <van-tab name="comment" title="待评价"></van-tab>
</van-tabs>
```

退出登录

![](./assets/1751617328228-bc272320-e5c8-4347-83f2-889e1359dedc.png)

### 打包配置优化



配置publicPath

```vue
module.exports = {
  // 设置获取.js,.css文件时，是以相对地址为基准的。
  // https://cli.vuejs.org/zh/config/#publicpath
  publicPath: './'
}
```

路由懒加载 & 异步组件， 不会一上来就将所有的组件都加载，而是访问到对应的路由了，才加载解析这个路由对应的所有组件

官网链接：[https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E4%BD%BF%E7%94%A8-webpack](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#使用-webpack)

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

```vue
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Login = () => import('@/views/login')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')
```
