<!--
   单列商品
-->
<template>
  <div class="singleWrap goodsWrap">
    <div class="titleImg" v-if="titleImg">
      <img src="" v-lazy="titleImg" alt="" />
    </div>

    <div class="listWrap">
      <div class="goodsList">
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
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 标题图片,可有可无
    titleImg: {
      type: String,
      default: ''
    },

    // 数据源
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {},
  created() {},
  mounted() {},
  methods: {
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
.singleWrap {
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

/deep/ .van-list {
  min-height: 100%;
}

.goodsList {
  background: rgb(218, 215, 215);
  padding: 6px 10px;
  .goodsItem {
    display: flex;
    width: 100%;
    background: #fff;
    margin-bottom: 6px;
    border-radius: 6px;
    overflow: hidden;
    padding: 6px 6px;

    .imgWrap {
      width: 100px;
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

    .infoWrap {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-left: 6px;

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
