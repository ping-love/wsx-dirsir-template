<!--
   分类组件
-->
<template>
  <div class="classifyModule">
    <headerBar background="#ffd347"></headerBar>
    <div class="main">
      <div class="mainWrap">
        <van-tabs
          v-model="activeIdx"
          :swipe-threshold="4"
          swipeable
          background="#fff"
          title-active-color="rgba(0,0,0,1)"
          title-inactive-color="rgba(0,0,0,0.6)"
          :line-width="30 / remBase + 'rem'"
          :line-height="3 / remBase + 'rem'"
          @change="onTabsChange"
        >
          <van-tab v-for="(tabItem, index) in tabList" :key="index" :title="tabItem.titleName" :name="index">
            <van-list
              class="goodsList"
              v-model="isMoreLoading"
              :finished="isMoreFinished"
              :error.sync="isMoreError"
              error-text="请求失败，点击重新加载"
              finished-text="没有更多了"
              offset="30"
              :immediate-check="false"
              @load="getMoreData"
            >
              <div class="itemWrap">
                <div class="item" v-for="(item, index) in currentList" :key="index" @click="toDetails(item.goodsId)">
                  <div class="imgWrap">
                    <div class="onlyFightTag" v-if="item.isRecommend">
                      <span class="fightIcon iconfont icon-recommend"></span>
                    </div>
                    <div class="comFightTag" v-if="item.ranking">
                      <div class="">
                        <span class="icon iconfont icon-jiangpaipaiming"></span>
                        <p class="fightTxt">{{ item.ranking }}</p>
                      </div>
                    </div>
                    <img v-lazy="item.imgUrl" :src="item.imgUrl" :key="item.imgUrl" alt="" />
                  </div>
                  <div class="infoWrap b-border">
                    <div class="titleWrap">
                      <p class="title one-txt-cut">{{ item.title }}</p>
                    </div>
                    <div class="otherWrap">
                      <div class="descBox">
                        <p class="desc">{{ item.desc }}</p>
                      </div>
                      <div class="tagBox" v-if="item.tags && item.tags.length > 0">
                        <span class="tag setBorderAll" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</span>
                      </div>
                      <div class="priceBox">
                        <p class="currPrice">￥{{ item.currentPrice }}</p>
                        <p class="originalPrice">￥{{ item.originalPrice }}</p>
                      </div>
                    </div>
                    <div class="cartBtn iconfont icon-gouwuche"></div>
                  </div>
                </div>
              </div>
            </van-list>

            <!-- <publicList :moduleData="totalData[index]" @loading="handleLoading"></publicList> -->
            <!-- <noData v-if="isNoData && currentList.length == 0"></noData> -->
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Data from '@/data/classify'
import headerBar from '@/components/headerBar'
import classifyItem from '@/components/viewComp/classifyListItem'
import noData from '@/components/viewComp/noData'
// import publicList from '@/components/publicList'
import api from '@/api'
export default {
  name: '',
  data() {
    return {
      remBase: '37.5',
      activeIdx: 0, // 激活的当前tabIdx
      tabList: [],
      pageNo: 0, // 页码
      pageSize: 10, // 每页条数
      currentList: [],
      infoData: {},
      totalData: {},

      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isMoreError: false, // 加载失败状态

      isNoData: false
      // isRefreshLoading: false, // 下拉刷新状态
      // isDisRefresh: false // 是否禁用刷新,
    }
  },
  computed: {},
  created() {
    this.$loading.show()
    this.getData()
  },
  mounted() {
    // setTimeout(() => {
    //   this.setTabsConHeight()
    // }, 500)
  },
  methods: {
    onTabsChange(name, title) {
      console.log(name, title)
      // this.activeIdx = name
      console.log(this.activeIdx)
      this.setScrollTop()
      this.getMoreData(true, this.activeIdx)
    },
    toDetails(goodsId) {
      console.log('-goods-id-', goodsId)
      this.$router.push({
        path: '/details',
        query: {
          goodsId
        }
      })
    },
    // 设置scrollTop
    setScrollTop() {
      // console.log(document.querySelector('.main').scrollTop)
      document.querySelector('.main').scrollTop = 0
    },
    getData() {
      setTimeout(() => {
        this.$loading.hide()
        this.tabList = Data.getClassifyTitles()
        console.log('-tab-list-', this.tabList)
        this.getMoreData(true, this.tabList[0].type)
      }, 1000)
    },
    getMoreData(isInit) {
      console.log('-isInit-', isInit, '-tabType-', this.activeIdx)
      if (isInit) {
        console.log('初始化。。。')
        this.pageNo = 0
        this.isMoreFinished = false
        let currentObj = this.totalData[this.activeIdx]
        console.log(!!currentObj)
        if (!!currentObj) {
          // this.pageNo++
          this.currentList = currentObj.list
          return
        }
        console.log('第一次查看当前类别')
        this.currentList = []
        let list = Data.getMoreData(this.pageSize, this.activeIdx)
        this.currentList = list
        this.totalData[this.activeIdx] = {
          totalCount: 30,
          isNextPage: true,
          isMoreError: false,
          list
        }
        // this.totalData[this.activeIdx] = list
        console.log('-total-data-', this.totalData)
        return
      }
      console.log('加载下一页。。。')
      this.pageNo++

      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }
      console.log('-req-params-', params)

      this.currentList = [...this.currentList, ...Data.getMoreData(this.pageSize, this.activeIdx)]
      this.isMoreLoading = false
      console.log('-pageNo-', this.pageNo)
      console.log('-total-data-', this.totalData)
      // console.log('-count-', this.totalData[this.activeIdx].totalCount)
      if (this.currentList.length >= this.totalData[this.activeIdx].totalCount) {
        this.isMoreFinished = true
      }
    },

    getInitData() {},
    // 加载更多
    getMoreDatass(isInit) {
      console.log('加载更多')
      isInit = isInit || false
      if (isInit) {
        this.pageNo = 0
        this.currentList = []
        this.isMoreLoading = true
        this.isMoreFinished = false
      } else {
        this.pageNo++
      }
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }
      console.log('-isInit-', isInit, '-params-', params, '-order-list-', this.currentList)
      api
        .getRechargeRecord(params)
        .then(res => {
          res = this.setData(this.activeIdx)
          console.log('-res-', res)
          console.log('-res-data-', res.data)
          this.isMoreLoading = false
          const data = res.data

          if (!data.result || data.result.length === 0) {
            console.log('当前没有数据')
            this.isNoData = true
            this.isMoreFinished = true
          } else {
            this.isNoData = false
            if (isInit) {
              this.currentList = data.result
            } else {
              this.currentList = [...this.currentList, ...data.result]
            }
            console.log(this.currentList)
            // console.log('-res-list-', data.result)
            if (this.currentList.length >= data.totalCount) {
              console.log('没有更多了！')
              this.isMoreFinished = true
            }
          }
        })
        .catch(err => {
          console.log('_ERR_', err)
          this.isMoreError = true
        })
    },
    setData(type) {
      type = type || 0
      let res = {
        code: 200,
        data: {
          hasNext: true,
          pageNo: 0,
          pageSize: 0,
          result: [
            {
              currency: type,
              cash: 20, // 充值数量
              amount: 19,
              utrate: 10,
              address: 'isa8suyd9cjnd0suya6tq6g7F8Nzhaiciszh',
              orderNum: '2625616512635123',
              createTime: '2020-07-01T03:24:59.873Z',
              name: '用户昵称',
              userId: 69090
            }
          ],
          totalCount: 28
        },
        msg: null
      }
      let len,
        count = res.data.totalCount
      len =
        Math.floor((count - this.pageNo * this.pageSize) / this.pageSize) >= 1 ? this.pageSize : count % this.pageSize
      console.log(len, count)
      let midArr = []
      for (let i = 0; i < len; i++) {
        midArr.push(...res.data.result)
      }
      res.data.result = midArr
      // console.log(res)
      return res
    },
    // 设置tab商品列表最低高度
    setTabsConHeight() {
      this.$nextTick(() => {
        const contentEle = document.querySelector('.mainWrap')
        // const contentEle = document.querySelector('.van-pull-refresh')
        const tabsContentEle = document.querySelector('.van-tabs__content')
        const tabsHeight = (window.innerWidth / 375) * 40
        tabsContentEle.style.minHeight = contentEle.offsetHeight - tabsHeight + 'px'
      })
    }
  },
  components: { headerBar, classifyItem, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.classifyModule {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    flex: 1;
    background: #f5f5f5;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.mainWrap {
  .content {
    .itemBox {
      padding: 10px 10px 0;
      .item {
        background: #fff;
        font-size: 14px;
        color: #222;
        line-height: 32px;
        border-radius: 8px;
        padding: 6px 12px;
        margin-bottom: 10px;
        div {
          display: flex;
          p:last-child {
            flex: 1;
          }
          &:first-child {
            justify-content: space-between;
            p:last-child {
              text-align: right;
              color: #42d969;
            }
          }
          &:nth-child(6),
          &:nth-child(7) {
            color: #999;
          }

          .addressText {
            word-break: break-word;
          }
        }
      }
    }
  }
}
/deep/ .van-tabs {
  .van-tabs__nav {
    // position: relative;
    // z-index: 999;
    // background: pink;
  }
  .van-tabs__wrap {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .van-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 49px;
    color: #000;
  }
  .van-tabs__line {
    background: #ffd12f;
    bottom: 14px;
  }
}

.itemWrap {
  // background: rgb(218, 215, 215);
  background: #fff;
  padding: 6px 12px;
  .item {
    display: flex;
    width: 100%;
    background: #fff;
    padding: 6px 0;
    // margin-bottom: 6px;
    // border-radius: 6px;
    overflow: hidden;
    // padding: 6px 6px 0;

    .imgWrap {
      width: 160px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }

      .onlyFightTag {
        position: absolute;
        top: 0;
        left: 0;

        .fightIcon {
          font-size: 32px;
          color: red;
        }
      }

      .comFightTag {
        position: absolute;
        top: 0;
        left: 0;
        div {
          position: relative;
          width: 24px;
          height: 24px;
          .icon {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 24px;
            color: rgb(141, 139, 138);
          }
          .fightTxt {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            color: #fff;
          }
        }
      }

      // .fightTag {
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 20px;
      //   height: 20px;
      //   background: pink;
      //   border-radius: 10px;
      //   text-align: center;

      //   .fightTxt {
      //     font-size: 16px;
      //     color: #000;
      //     font-family: DIN-Medium, DIN;
      //     font-weight: 500;
      //     padding: 6px 6px;
      //   }
      // }
    }

    /deep/ .b-border:before {
      background: red;
    }
    .infoWrap {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-left: 6px;
      // padding-bottom: 6px;

      .titleWrap {
        overflow: hidden;
        .title {
          font-size: 16px;
          line-height: 24px;
          color: #000;
        }
      }

      .otherWrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .descBox {
          font-size: 12px;
          line-height: 18px;
          color: #999;
        }

        .tagBox {
          display: flex;
          .tag {
            font-size: 12px;
            padding: 2px 6px;
            margin-right: 6px;
            &.setBorderAll:after {
              border-color: red;
              border-radius: 8px;
            }
          }
        }

        .priceBox {
          display: flex;
          align-items: center;
          .currPrice {
            font-size: 16px;
            color: red;
            margin-right: 6px;
          }

          .originalPrice {
            font-size: 12px;
            color: #999;
            text-decoration: line-through;
          }
        }
      }

      .cartBtn {
        position: absolute;
        bottom: 0;
        right: 0;
        color: red;
        font-size: 20px;
      }
    }
  }
}
</style>
