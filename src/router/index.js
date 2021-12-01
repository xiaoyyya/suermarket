
import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import("../views/home/home")
const Cart = () => import("../views/cart/Cart")
const Category = () => import("../views/category/Category")
const Profile = () => import("../views/profile/Profile")
const Detail=() =>import("../views/detail/Detail")
//1.安装插件


//2.创建router
const routes = [{
  path: '',
  redirect: '/home',
}, {
  path: '/home',
  name:'home',
  meta: {
    keepAlive: true //设置页面是否需要使用缓存
  },
  component: Home
},
  {
    path: '/cart',
    component: Cart,
    meta: {
      keepAlive: false //设置页面是否需要使用缓存
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: false //设置页面是否需要使用缓存
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: false //设置页面是否需要使用缓存
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      keepAlive: false //设置页面是否需要使用缓存
    }
  }

];
const router = createRouter({
  // 区别于vue2的mode，vue3中将使用history属性来决定采用哪种路由模式
  history: createWebHashHistory(), // 默认为Hash模式，可设置createWebHistory模式
  // 区别于vue2的base，vue3中的基础路由路径将作为createWebHashHistory或者createWebHistory的唯一参数配置到路由中。
  routes,
});
//3.导出
export default router
