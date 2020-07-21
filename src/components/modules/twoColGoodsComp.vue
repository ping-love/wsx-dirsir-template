<!--
   俩列商品
-->
<template>
  <div class="goodsWrap">
    <div class="titleImg" v-if="titleImg">
      <img src="" v-lazy="titleImg" alt="" />
    </div>
    <template v-if="isInfiniteLoading">
      <div class="listWrap">
        <van-list
          class="goodsList"
          v-model="isLoading"
          :finished="isFinished"
          :error.sync="isError"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          :offset="offset"
          :immediate-check="false"
          @load="initLoading"
        >
          <div class="goodsItem" v-for="(item, index) in list" :key="index" @click="toDetails(item.goodsId)">
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
              <img v-lazy="item.imgUrl" :key="item.imgUrl" alt="" />
            </div>
            <div class="infoWrap">
              <div class="titleWrap">
                <p class="title two-txt-cut">{{ item.title }}</p>
              </div>
              <div class="otherWrap" :class="{ noTags: !item.tags || item.tags.length == 0 }">
                <!-- <div class="descBox">
                  <p class="desc">{{ item.desc }}</p>
                </div> -->
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
        </van-list>
      </div>
    </template>

    <template v-else>
      <div class="listWrap">
        <van-list class="goodsList">
          <div class="goodsItem" v-for="(item, index) in list" :key="index" @click="toDetails(item.goodsId)">
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
              <img v-lazy="item.imgUrl" :key="item.imgUrl" alt="" />
            </div>
            <div class="infoWrap">
              <div class="titleWrap">
                <p class="title two-txt-cut">{{ item.title }}</p>
              </div>
              <div class="otherWrap" :class="{ noTags: !item.tags || item.tags.length == 0 }">
                <!-- <div class="descBox">
                  <p class="desc">{{ item.desc }}</p>
                </div> -->
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
        </van-list>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      isFinished: false,
      isError: false
    }
  },
  props: {
    // 标题图片,可有可无
    titleImg: {
      type: String,
      default: ''
    },
    // 是否无限加载，默认为true
    isInfiniteLoading: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number | String,
      default: 300
    },
    // 总list长度
    totalCount: {
      type: Number,
      default: 10
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    isMoreError: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isMoreError(newVal, oldVal) {
      console.log('-new-error-', newVal, '-old-error-', oldVal)
      if (newVal) {
        this.isError = true
        this.isLoading = false
      }
    },
    list(newVal, oldVal) {
      console.log('-new-', newVal, 'old', oldVal)
      console.log('单次请求数据加载完成')
      this.isLoading = false
      if (newVal.length >= this.totalCount) {
        this.isFinished = true
        console.log('数据全部加载完成')
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.isMoreError)
  },
  methods: {
    initLoading() {
      console.log('-child-isError-', this.isError, '-parent-isMoreError-', this.isMoreError)
      if (this.isMoreError) {
        this.$emit('update:isMoreError', false)
      }
      let path = this.$route.path.slice(1)
      this.$emit('loading', `${path}页面触发了loading加载更多事件`)
    },
    toDetails(goodsId) {
      console.log('-goods-id-', goodsId)
      this.$router.push({
        path: '/details',
        query: {
          goodsId
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

@itemWidth: 172.5px;

.goodsWrap {
  height: 100%;
  .titleImg {
    width: 100%;
    display: flex;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .listWrap {
    // height: 100%;
    // overflow: auto;
  }
}

// /deep/ .van-list {
//   min-height: 100%;
// }

.goodsList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  background: rgb(218, 215, 215);
  padding: 5px 10px;
  .goodsItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: @itemWidth;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 6px 6px;
    &:nth-child(2n + 1) {
      margin-right: 5px;
    }
    &:nth-child(2n) {
      margin-left: 5px;
    }

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
    }

    .infoWrap {
      width: 100%;
      height: 100px;
      // flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-left: 6px;

      .titleWrap {
        overflow: hidden;
        margin-bottom: 6px;
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
        &.noTags {
          justify-content: flex-end;
        }

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
/deep/ .van-list {
  .van-list__finished-text {
    width: 100%;
  }
  .van-list__error-text {
    width: 100%;
  }
  .van-list__loading {
    width: 100%;
  }
}
</style>
