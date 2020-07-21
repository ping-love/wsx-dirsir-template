<!--  -->
<template>
  <div class="index" ref="indexWrapper">
    <headBar :onBack="onBack"></headBar>
    <div class="main">
      <div class="btnBox pageBtnBox">
        <van-button class="toLoginBtn" type="info" size="small" @click="toShare">去微信分享</van-button>
        <van-button class="toLoginBtn" type="info" size="small" @click="toShare">去朋友圈分享</van-button>
        <van-button class="toLoginBtn" type="info" size="small" @click="toShare">去qq分享</van-button>
      </div>
      <div class="content">
        {{ userInfo.myname }}
      </div>
    </div>
  </div>
</template>

<script>
import headBar from '@/components/headBar'
import openNative from '@/native/openNative'
import api from '@/api/index'
import { mapState, mapGetters } from 'vuex'
import storage from '@/utils/storage'
import wx from '@/utils/jweixin'
export default {
  name: '',
  data() {
    return {}
  },
  created() {
    // this.getData()
  },
  mounted() {
    console.log('测试服版本v0.0.1')
    openNative.setHeaderBar()
    console.log('-userInfo-', this.userInfo)

    // 'onMenuShareTimeline',
    // 'onMenuShareAppMessage'
    console.log('-wx-', wx)
    wx.ready(function() {
      // console.log('-this-', this)
      //分享给朋友
      wx.onMenuShareTimeline({
        title: '测试分享朋友',
        desc: '分享使我快乐', // 分享描述
        link: 'https://api.tangseng.io/livemember/download', // 分享地址
        imgUrl: 'https://fileup.ickapay.com/file/imgOneVideo4/3/28f1e135d87941f8a59dcc3d5d81c7c4.jpg', // 分享显示的缩略图地址, 根据自己情况而定
        success: function() {
          // 分享成功可以做相应的数据处理
          console.log('-调用微信分享朋友功能-')
          alert('分享成功')
        }
      })
      wx.onMenuShareAppMessage({
        title: '测试分享朋友圈',
        desc: '分享使我快乐', // 分享描述
        link: 'https://api.tangseng.io/livemember/download', // 分享地址
        imgUrl: 'https://fileup.ickapay.com/file/imgOneVideo4/3/28f1e135d87941f8a59dcc3d5d81c7c4.jpg', // 分享显示的缩略图地址, 根据自己情况而定
        success: function() {
          // 分享成功可以做相应的数据处理
          console.log('-调用微信分享朋友圈功能-')
          alert('分享成功')
        }
      })
    })
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    toShare() {
      console.log(wx)
      //       wx.ready(function() {
      //   //分享给朋友
      //  wx.updateAppMessageShareData({
      //  "title": '深圳时尚家居设计周', // 分享标题
      //  "desc": '', // 分享描述
      //  "link": '', // 分享地址
      //  "imgUrl": '', // 分享显示的缩略图地址, 根据自己情况而定
      //  success: function() {
      //   // 分享成功可以做相应的数据处理
      //   alert('分享成功')
      //  }
      // });
    },
    onBack() {
      openNative.closeWebview()
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
  components: { headBar }
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
      padding-top: 30px;
      .toHomeBtn,
      .toLoginBtn {
        margin-right: 30px;
      }
    }
  }
}
</style>
