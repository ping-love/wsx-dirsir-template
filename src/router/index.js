import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const testVueApiRouter = [
  {
    path: '/testVueApi',
    name: 'TestVueApi',
    component: () => import(/* webpackChunkName: 'testVueApi' */ '@/views/testVueApi'),
    meta: {
      title: '测试vue-api'
    }
  }
]

const testModuleRouter = [
  {
    path: '/moduleConfigTest',
    name: 'ModuleConfigTest',
    component: () => import(/* webpackChunkName: 'moduleConfigTest' */ '@/views/testModule/moduleConfigTest'),
    meta: {
      title: '组件配置测试'
    }
  },
  {
    path: '/singleGoods',
    name: 'SingleGoods',
    component: () => import(/* webpackChunkName: 'singleGoods' */ '@/views/testModule/singleGoods'),
    meta: {
      title: '单列商品'
    }
  },
  {
    path: '/twoColGoods',
    name: 'TwoColGoods',
    component: () => import(/* webpackChunkName: 'twoColGoods' */ '@/views/testModule/twoColGoods'),
    meta: {
      title: '俩列商品'
    }
  },
  {
    path: '/threeColGoods',
    name: 'ThreeColGoods',
    component: () => import(/* webpackChunkName: 'threeColGoods' */ '@/views/testModule/threeColGoods'),
    meta: {
      title: '三列商品'
    }
  },
  {
    path: '/classifyModuleTest',
    name: 'ClassifyModuleTest',
    component: () => import(/* webpackChunkName: 'classifyModuleTest' */ '@/views/testModule/classifyModuleTest'),
    meta: {
      title: '分类列表组件测试'
    }
  }
]

const projectPageRouter = [
  {
    path: '/mallHome',
    name: 'MallHome',
    component: () => import(/* webpackChunkName: 'mallHome' */ '@/views/mallHome/mallHome'),
    meta: {
      title: '商品首页'
    }
  },
  {
    path: '/activityListPage',
    name: 'ActivityListPage',
    component: () => import(/* webpackChunkName: 'activityListPage' */ '@/views/activityListPage'),
    meta: {
      title: '活动榜单'
    }
  },
  {
    path: '/waterFall',
    name: 'WaterFall',
    component: () => import(/* webpackChunkName: 'waterFall' */ '@/views/waterFall'),
    meta: {
      title: '瀑布流布局'
    }
  },
  {
    path: '/classifyList',
    name: 'ClassifyList',
    component: () => import(/* webpackChunkName: 'classifyList' */ '@/views/classifyList'),
    meta: {
      title: '分类列表'
    }
  },
  {
    path: '/goodsList',
    name: 'GoodsList',
    component: () => import(/* webpackChunkName: 'goodsList' */ '@/views/goods/goodsList'),
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: 'search' */ '@/views/search'),
    meta: {
      title: '搜索页'
    }
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: 'details' */ '@/views/goods/details'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: 'cart' */ '@/views/cart'),
    meta: {
      title: '购物车'
    }
  }
]

const commonPageRouter = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(/* webpackChunkName: 'activity' */ '@/views/activity/actOne'),
    meta: {
      title: '活动页'
    }
  },
  {
    path: '/listPage',
    name: 'ListPage',
    component: () => import(/* webpackChunkName: 'listPage' */ '@/views/listPage'),
    meta: {
      title: '列表页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/userAgreement',
    name: 'UserAgreement',
    component: () => import(/* webpackChunkName: 'userAgreement' */ '@/views/userAgreement'),
    meta: {
      title: '用户协议'
    }
  }
]

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
    meta: {
      title: 'index页'
    }
  },
  ...commonPageRouter, // 没有用上可以直接删除掉
  ...projectPageRouter,
  ...testModuleRouter,
  ...testVueApiRouter
]

const errorPage = [
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: () => import(/* webpackChunkName: 'errorPage' */ '@/views/errorPage/404')
  }
]

// console.log('-router-', routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(errorPage)
})
export default router
