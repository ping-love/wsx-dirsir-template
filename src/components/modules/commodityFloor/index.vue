<!--
   商品楼层
-->
<template>
  <div class="commodityFloor" :style="{ background: colorInfo.mainBg }">
    <div class="titleBox">
      <div class="left">
        <div class="shopBox" v-if="isShop">
          <img v-lazy="leftInfo.shopInfo.icon" alt="" />
          <div class="shopRight">
            <p class="shopName">{{ leftInfo.shopInfo.name }}</p>
            <p class="shopDesc">{{ leftInfo.shopInfo.desc }}</p>
          </div>
        </div>
        <div class="noShopBox" v-else>
          <img class="icon" v-lazy="titleIcon" alt="" v-if="titleIcon" />
          <p
            class="txt"
            :class="index == 1 ? 'l-border' : ''"
            v-for="(item, index) in leftInfo.otherInfo.titles"
            :key="index"
          >
            {{ item }}
          </p>
        </div>
      </div>
      <div class="right" @click="onBtnClick(rightInfo.linkType)">
        <p>{{ rightInfo.btnTxt }}</p>
      </div>
    </div>
    <div class="listBox" :style="{ background: colorInfo.mainBg }">
      <div class="item" :class="itemClassName" v-for="(item, index) in list" :key="index">
        <div class="imgWrap">
          <img v-lazy="item.imgUrl" alt="" />
        </div>
        <div class="otherWrap">
          <p class="tag" :style="{ color: colorInfo.otherColor }">{{ item.tagName }}</p>
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
    moduleData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 颜色信息
    colorInfo() {
      let { mainBg, titleColor, otherColor } = this.moduleData
      return {
        mainBg,
        titleColor,
        otherColor
      }
    },
    // 是否店铺
    isShop() {
      let { isShop } = this.leftInfo
      // console.log('-title-left-', isShop)
      return isShop
    },
    titleIcon() {
      let isIcon = this.leftInfo.otherInfo.icon
      // console.log(isIcon)
      return isIcon
    },
    leftInfo() {
      // console.log(this.titleInfo.left)
      return this.titleInfo.left
    },
    rightInfo() {
      // console.log(this.titleInfo.right)
      return this.titleInfo.right
    },
    titleInfo() {
      // console.log('-title-box-', this.moduleData.titleInfo)
      return this.moduleData.titleInfo
    },
    list() {
      return this.moduleData.list
    },
    itemClassName() {
      let cn = ''
      // console.log('-list-len-', this.list.length)
      switch (this.list.length) {
        case 1:
          cn = 'oneItem'
          break
        case 2:
          cn = 'twoItem'
          break
        case 3:
          cn = 'threeItem'
          break
        case 4:
          cn = 'fourItem'
          break
        default:
          cn = 'otherItem'
          break
      }
      // console.log('-item-class-name-', cn)
      return cn
    }
  },
  created() {},
  mounted() {
    // console.log('-commodity-floor-', this.moduleData)
  },
  methods: {
    onBtnClick(linkType) {
      console.log('-link-type-', linkType)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.commodityFloor {
  padding: 0 12px;
  margin-bottom: 6px;
  .titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 12px 0;
    .left {
      color: #181818;
      .shopBox {
        display: flex;
        align-items: center;
        img {
          width: 42px;
          height: 42px;
        }
        .shopRight {
          margin-left: 10px;
          .shopName {
            // color: #181818;
          }
          .shopDesc {
            color: #9c9c9c;
          }
        }
      }
      .noShopBox {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 6px;
        }
        .txt {
          &:nth-of-type(1) {
            font-weight: 600;
            padding-right: 6px;
          }
          &:nth-of-type(2) {
            color: #9c9c9c;
            padding-left: 6px;
          }
        }
        /deep/ .l-border:before {
          background-color: #9c9c9c;
        }
      }
    }
    .right {
      color: #9c9c9c;
    }
  }
  .listBox {
    display: flex;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 6px;
      .imgWrap {
        width: 100%;
        display: flex;
        img {
          width: 100%;
          // height: 100px;
          height: 100%;
        }
      }
      .otherWrap {
        .tag {
          line-height: 32px;
        }
      }
      &.oneItem {
        width: 100%;
        &:nth-child(n + 1) {
          margin-right: 0;
        }
      }
      &.twoItem {
        width: 50%;
        &:nth-child(2n + 2) {
          margin-right: 0;
        }
      }
      &.threeItem {
        width: 33.33%;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
      &.fourItem {
        width: 25%;
        &:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
