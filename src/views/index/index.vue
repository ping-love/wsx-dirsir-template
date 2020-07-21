<!--  -->
<template>
  <div class="index" ref="indexWrapper">
    <headerBar :onBack="onBack"></headerBar>
    <div class="main">
      <!-- <div class="btnBox">
        <van-button class="btnItem" type="info" size="small" @click="toPageHandle('Login')">登录页</van-button>
      </div>
      <div class="btnBox pageBtnBox">
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ListDemo')">测试list</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('Home')">首页</van-button>

        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('CommodityFloor')"
          >商品楼层</van-button
        >

        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ClassifyList')"
          >分类列表</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('WaterFall')"
          >瀑布流布局</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ListPage')">列表页</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('GoodsList')">商品列表</van-button>
      </div>
      <div class="btnBox">
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('HomeSwiper')"
          >首页轮播</van-button
        >
      </div> -->
      <div class="btnBox">
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('MallHome')">商城首页</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ActivityListPage')"
          >活动榜单页</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('Activity')">活动页</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ClassifyList')"
          >分类列表</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('Details')">商品详情</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('Search')">搜索页</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('Cart')">购物车</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('WaterFall')">瀑布流</van-button>
      </div>
      <div class="btnBox">
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ModuleConfigTest')"
          >组件配置测试</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ClassifyModuleTest')"
          >分类组件测试</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('SingleGoods')"
          >单列商品组件测试</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('TwoColGoods')"
          >两列商品组件测试</van-button
        >
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('ThreeColGoods')"
          >三列商品组件测试</van-button
        >
      </div>
      <div class="btnBox cacheBtnBox">
        <van-button class="btnItem" type="primary" size="small" @click="handleCache('add')">添加缓存</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="handleCache('del')">删除缓存</van-button>
        <van-button class="btnItem" type="primary" size="small" @click="toPageHandle('TestVueApi')">测试api</van-button>
      </div>
      <div class="content">
        {{ userInfo.myname }}
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import openNative from '@/native/openNative'
import api from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import storage from '@/utils/storage'
import tools from '@/utils/tools'
export default {
  name: 'Index',
  data() {
    return {}
  },
  created() {
    openNative.setHeaderBar()
  },
  mounted() {
    console.log('测试服版本v0.0.1')
    window.addEventListener('pageshow', function() {
      console.log('show')
    })
    window.addEventListener('pagehide', function() {
      console.log('hide')
    })
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    handleCache(type) {
      console.log('type', type)
      let arr = ['home', 'order', 2, true, undefined, null, NaN, { name: 1 }, [1]]
      let source = ['detail', 'goods', 1, 2, 6, true, undefined, null, NaN, { name: 1 }, [1]]
      let result = []
      if (type === 'add') {
        result = [...arr, ...source]
      } else {
        result = tools.removeArrEl(source, arr)
      }
      console.log(result, source, arr)
    },
    toPageHandle(routerName) {
      console.log(routerName)
      // let data = {
      //   anchor: false,
      //   inviteCode: 'L2X356',
      //   inviteUserId: null,
      //   myname: '86-15702424859',
      //   signatures: '',
      //   smallpic: 'https://fileup.ickapay.com/file/onevideo/1157e3b09bfc47959cc0cdaa9842da82.jpg',
      //   tsp: 0,
      //   tspPool: 0,
      //   tst: 678678656,
      //   userId: 2001029
      // }
      // data.myname = '123'
      // this.$store.commit('user/setUserInfo', data)
      this.$router.push({ name: routerName })
    },
    getData() {
      this.$loading.show()
      api
        .getTsInfo()
        .then(res => {
          // console.log(res)
          this.$loading.hide()
          if (res.code == 200) {
            const data = res.data
            console.log(data)
            this.$store.commit('user/setUserInfo', data)
            storage.setItem('userInfo', JSON.stringify(data))
          }
        })
        .catch(error => {
          console.log(error)
          this.$loading.hide()
        })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
.index {
  height: 100%;
  .main {
    height: 100%;
    .btnBox {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding: 30px 20px 0;
      .btnItem {
        margin: 0 10px 20px;
      }
    }
    .content {
      font-size: 16px;
      text-align: center;
      padding: 20px 20px;
    }
  }
}
</style>
