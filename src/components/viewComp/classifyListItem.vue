<!--
   分类列表item
-->
<template>
  <div class="itemWrap">
    <div class="item" v-for="(item, index) in list" :key="index" @click="toDetails(item.goodsId)">
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
</template>

<script>
export default {
  name: '',
  data() {
    return {
      defaultImg: require('@/assets/images/common/defaultImg.png')
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      console.log('-classify-item-', this.list)
    })
  },
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
